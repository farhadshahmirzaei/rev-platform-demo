import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  DollarSign,
  ShieldAlert,
  Users,
  Bot,
  Activity,
  Kanban,
  TrendingUp,
  Play,
  Pause,
  Plus,
} from 'lucide-react';
import {
  getLocalizedAgents,
  getLocalizedInvoices,
  getLocalizedLeads,
  getLocalizedTasks,
  translateAgentStatus,
  translateInvoiceStatus,
  translateLeadStage,
  translateTrustLevel,
} from '../data/mockData';
import { Agent, Language, TaskItem } from '../types';
import { AgentEfficiencyChart } from './AgentEfficiencyChart';

interface RevWebAppProps {
  language: Language;
}

const WEBAPP_COPY = {
  en: {
    workspaceTitle: 'Rev Workspace · Demo Organization',
    onShiftSuffix: 'AI Employees on shift',
    systemStatus: 'Operating system active · All systems operational',
    killSwitchActive: 'Kill Switch Active (Paused)',
    killSwitchIdle: 'Global Kill Switch',
    killSwitchResumedToast: 'Kill switch disengaged. Agents resumed.',
    killSwitchEngagedToast: 'KILL SWITCH ENGAGED! All AI agent runs paused instantly.',
    tabDashboard: 'Dashboard & Attention',
    tabAgents: 'AI Employees',
    tabLeads: 'Leads & Deals',
    tabTasks: 'Task Board',
    tabInvoices: 'Invoices & Finance',
    kpiLeadsLabel: 'Leads this month',
    kpiLeadsDelta: '+24% vs last month',
    kpiTasksLabel: 'Tasks with an owner',
    kpiTasksSub: '4 managed by AI agents',
    kpiRunsLabel: 'Agent runs today',
    kpiRunsSub: '100% success rate',
    kpiArrLabel: 'Monthly ARR Run-rate',
    kpiArrValue: '$84.5K',
    kpiArrSub: 'Stable cash burn',
    attentionTitle: 'Attention Inbox',
    needsApproval: 'Needs approval',
    allClear: 'All clear! Nothing needs you right now.',
    justNow: 'Just now',
    approveBtn: 'Approve & Execute',
    declineBtn: 'Decline',
    declinedToast: 'Request declined.',
    approvedToast: (name: string) => `Approved request from ${name}. Action executed successfully.`,
    activityTitle: 'Live Activity Stream',
    activitySubtitle: 'Real-time agent execution timeline',
    agentsHeading: 'AI Employees Catalogue & Roster',
    agentsSub: 'Every agent has a role, schedule, and trust level.',
    hireAgentBtn: '+ Hire New AI Agent',
    hireAgentToast: 'Agent hiring catalogue opened.',
    trustLevelLabel: 'Trust Level:',
    scheduleLabel: 'Schedule:',
    runsTodayLabel: 'Runs today:',
    runsUnit: 'runs',
    pauseAgent: 'Pause Agent',
    resumeAgent: 'Resume Agent',
    idLabel: 'ID:',
    statusToast: (name: string, status: string) => `Agent ${name} status updated to ${status}.`,
    leadsHeading: 'Leads & Deal Pipeline',
    leadsSub: 'Qualified automatically by Rev Sales & Lead Gen agents.',
    addLeadBtn: '+ Add Lead',
    addLeadToast: 'New lead form opened.',
    colCompany: 'Company',
    colContact: 'Contact',
    colScore: 'AI Score',
    colStage: 'Stage',
    colSource: 'Source',
    colLastTouch: 'Last Touch',
    tasksHeading: 'Workspace Task Board',
    tasksSub: 'Shared between people and Rev AI employees.',
    createTaskBtn: '+ Create Task',
    taskPlaceholder: 'Enter new task title...',
    taskSaveBtn: 'Add Task',
    taskCancelBtn: 'Cancel',
    taskOwnerYou: 'You',
    taskDueSoon: 'Soon',
    taskAddedToast: 'Task added successfully.',
    taskColTodo: 'To Do',
    taskColInProgress: 'In Progress',
    taskColDone: 'Done',
    invoicesHeading: 'Invoices & Financial Records',
    invoicesSub: 'Monitored and chased by the Rev Finance Controller agent.',
    createInvoiceBtn: '+ Create Invoice',
    createInvoiceToast: 'New invoice dialog opened.',
    colInvoiceId: 'Invoice ID',
    colClient: 'Client',
    colAmount: 'Amount',
    colStatus: 'Status',
    colDueDate: 'Due Date',
  },
  fa: {
    workspaceTitle: 'فضای کاری رِو · سازمان دمو',
    onShiftSuffix: 'کارمند هوش مصنوعی در شیفت',
    systemStatus: 'سیستم‌عامل فعال است · همه سرویس‌ها در حال کارند',
    killSwitchActive: 'توقف اضطراری فعال (متوقف‌شده)',
    killSwitchIdle: 'کلید توقف اضطراری',
    killSwitchResumedToast: 'توقف اضطراری غیرفعال شد. فعالیت عوامل از سر گرفته شد.',
    killSwitchEngagedToast: 'کلید توقف اضطراری فعال شد! تمامی اجراهای عوامل هوشمند فوراً متوقف شدند.',
    tabDashboard: 'داشبورد و صندوق توجه',
    tabAgents: 'کارمندان هوش مصنوعی',
    tabLeads: 'سرنخ‌ها و معاملات',
    tabTasks: 'تابلوی وظایف',
    tabInvoices: 'فاکتورها و امور مالی',
    kpiLeadsLabel: 'سرنخ‌های این ماه',
    kpiLeadsDelta: '+۲۴٪ نسبت به ماه گذشته',
    kpiTasksLabel: 'وظایف دارای مسئول',
    kpiTasksSub: '۴ مورد تحت مدیریت عوامل هوشمند',
    kpiRunsLabel: 'اجراهای امروز عوامل',
    kpiRunsSub: '۱۰۰٪ نرخ موفقیت',
    kpiArrLabel: 'نرخ درآمد سالانه ماهانه',
    kpiArrValue: '۸۴.۵ هزار دلار',
    kpiArrSub: 'نقدینگی پایدار',
    attentionTitle: 'صندوق توجه',
    needsApproval: 'نیازمند تایید',
    allClear: 'همه‌چیز مرتب است! موردی منتظر تایید شما نیست.',
    justNow: 'هم‌اکنون',
    approveBtn: 'تایید و اجرا',
    declineBtn: 'رد کردن',
    declinedToast: 'درخواست رد شد.',
    approvedToast: (name: string) => `درخواست ${name} تایید و با موفقیت اجرا شد.`,
    activityTitle: 'جریان زنده فعالیت‌ها',
    activitySubtitle: 'خط زمانی لحظه‌ای اجرای عوامل',
    agentsHeading: 'فهرست و شیفت کارمندان هوش مصنوعی',
    agentsSub: 'هر عامل دارای نقش، زمان‌بندی و سطح اعتماد مشخص است.',
    hireAgentBtn: '+ استخدام عامل هوش مصنوعی جدید',
    hireAgentToast: 'فهرست استخدام عوامل هوش مصنوعی باز شد.',
    trustLevelLabel: 'سطح اعتماد:',
    scheduleLabel: 'زمان‌بندی:',
    runsTodayLabel: 'اجراهای امروز:',
    runsUnit: 'اجرا',
    pauseAgent: 'توقف عامل',
    resumeAgent: 'ادامه فعالیت',
    idLabel: 'شناسه:',
    statusToast: (name: string, status: string) => `وضعیت ${name} به «${status}» تغییر کرد.`,
    leadsHeading: 'سرنخ‌ها و قیف فروش',
    leadsSub: 'ارزیابی‌شده به‌صورت خودکار توسط عوامل فروش و جذب سرنخ رِو.',
    addLeadBtn: '+ افزودن سرنخ',
    addLeadToast: 'فرم ثبت سرنخ جدید باز شد.',
    colCompany: 'شرکت',
    colContact: 'مخاطب',
    colScore: 'امتیاز هوشمند',
    colStage: 'مرحله',
    colSource: 'منبع',
    colLastTouch: 'آخرین تعامل',
    tasksHeading: 'تابلوی وظایف فضای کاری',
    tasksSub: 'مشترک میان اعضای تیم و کارمندان هوش مصنوعی رِو.',
    createTaskBtn: '+ ایجاد وظیفه جدید',
    taskPlaceholder: 'عنوان وظیفه جدید را وارد کنید...',
    taskSaveBtn: 'ثبت وظیفه',
    taskCancelBtn: 'انصراف',
    taskOwnerYou: 'شما',
    taskDueSoon: 'به‌زودی',
    taskAddedToast: 'وظیفه با موفقیت اضافه شد.',
    taskColTodo: 'در صف انجام',
    taskColInProgress: 'در حال انجام',
    taskColDone: 'تکمیل‌شده',
    invoicesHeading: 'فاکتورها و سوابق مالی',
    invoicesSub: 'پایش و پیگیری خودکار توسط عامل کنترلر مالی رِو.',
    createInvoiceBtn: '+ صدور فاکتور جدید',
    createInvoiceToast: 'پنجره صدور فاکتور جدید باز شد.',
    colInvoiceId: 'شماره فاکتور',
    colClient: 'مشتری',
    colAmount: 'مبلغ',
    colStatus: 'وضعیت',
    colDueDate: 'تاریخ سررسید',
  },
  id: {
    workspaceTitle: 'Ruang Kerja Rev · Organisasi Demo',
    onShiftSuffix: 'Karyawan AI bertugas',
    systemStatus: 'Sistem operasi aktif · Semua sistem berjalan normal',
    killSwitchActive: 'Tombol Darurat Aktif (Dijeda)',
    killSwitchIdle: 'Tombol Darurat Global',
    killSwitchResumedToast: 'Tombol darurat dinonaktifkan. Agen kembali berjalan.',
    killSwitchEngagedToast: 'TOMBOL DARURAT AKTIF! Semua eksekusi agen AI dijeda seketika.',
    tabDashboard: 'Dasbor & Perhatian',
    tabAgents: 'Karyawan AI',
    tabLeads: 'Prospek & Kesepakatan',
    tabTasks: 'Papan Tugas',
    tabInvoices: 'Faktur & Keuangan',
    kpiLeadsLabel: 'Prospek bulan ini',
    kpiLeadsDelta: '+24% vs bulan lalu',
    kpiTasksLabel: 'Tugas berpemilik',
    kpiTasksSub: '4 dikelola oleh agen AI',
    kpiRunsLabel: 'Eksekusi agen hari ini',
    kpiRunsSub: '100% tingkat keberhasilan',
    kpiArrLabel: 'Laju ARR Bulanan',
    kpiArrValue: '$84.5K',
    kpiArrSub: 'Arus kas stabil',
    attentionTitle: 'Kotak Masuk Perhatian',
    needsApproval: 'Perlu persetujuan',
    allClear: 'Semua beres! Tidak ada yang perlu tindakan Anda saat ini.',
    justNow: 'Baru saja',
    approveBtn: 'Setujui & Jalankan',
    declineBtn: 'Tolak',
    declinedToast: 'Permintaan ditolak.',
    approvedToast: (name: string) => `Permintaan dari ${name} disetujui dan dijalankan.`,
    activityTitle: 'Aliran Aktivitas Langsung',
    activitySubtitle: 'Linimasa eksekusi agen secara langsung',
    agentsHeading: 'Katalog & Daftar Karyawan AI',
    agentsSub: 'Setiap agen memiliki peran, jadwal, dan tingkat kepercayaan.',
    hireAgentBtn: '+ Rekrut Agen AI Baru',
    hireAgentToast: 'Katalog perekrutan agen dibuka.',
    trustLevelLabel: 'Tingkat Kepercayaan:',
    scheduleLabel: 'Jadwal:',
    runsTodayLabel: 'Eksekusi hari ini:',
    runsUnit: 'eksekusi',
    pauseAgent: 'Jeda Agen',
    resumeAgent: 'Lanjutkan Agen',
    idLabel: 'ID:',
    statusToast: (name: string, status: string) => `Status ${name} diperbarui menjadi ${status}.`,
    leadsHeading: 'Prospek & Pipa Kesepakatan',
    leadsSub: 'Dikualifikasi otomatis oleh agen Penjualan & Prospek Rev.',
    addLeadBtn: '+ Tambah Prospek',
    addLeadToast: 'Formulir prospek baru dibuka.',
    colCompany: 'Perusahaan',
    colContact: 'Kontak',
    colScore: 'Skor AI',
    colStage: 'Tahap',
    colSource: 'Sumber',
    colLastTouch: 'Kontak Terakhir',
    tasksHeading: 'Papan Tugas Ruang Kerja',
    tasksSub: 'Berbagi antara tim manusia dan karyawan AI Rev.',
    createTaskBtn: '+ Buat Tugas',
    taskPlaceholder: 'Masukkan judul tugas baru...',
    taskSaveBtn: 'Tambah Tugas',
    taskCancelBtn: 'Batal',
    taskOwnerYou: 'Anda',
    taskDueSoon: 'Segera',
    taskAddedToast: 'Tugas berhasil ditambahkan.',
    taskColTodo: 'Akan Dikerjakan',
    taskColInProgress: 'Sedang Berjalan',
    taskColDone: 'Selesai',
    invoicesHeading: 'Faktur & Catatan Keuangan',
    invoicesSub: 'Dipantau dan ditindaklanjuti oleh agen Kontroler Keuangan Rev.',
    createInvoiceBtn: '+ Buat Faktur',
    createInvoiceToast: 'Dialog faktur baru dibuka.',
    colInvoiceId: 'ID Faktur',
    colClient: 'Klien',
    colAmount: 'Jumlah',
    colStatus: 'Status',
    colDueDate: 'Jatuh Tempo',
  },
};

const INITIAL_ATTENTION_BY_LANG = {
  en: [
    {
      id: 'att-1',
      agent: 'Rev Finance Controller',
      message: 'Approve sending payment reminder to Parsian Group ($7,400 overdue)',
      type: 'payment',
    },
    {
      id: 'att-2',
      agent: 'Rev Lead Researcher',
      message: 'Qualify 8 newly scraped enterprise leads in Fintech sector',
      type: 'approval',
    },
  ],
  fa: [
    {
      id: 'att-1',
      agent: 'کنترلر مالی هوشمند رِو',
      message: 'تایید ارسال یادآوری پرداخت برای گروه پارسیان (۷٬۴۰۰ دلار سررسید گذشته)',
      type: 'payment',
    },
    {
      id: 'att-2',
      agent: 'پژوهشگر سرنخ هوشمند رِو',
      message: 'ارزیابی ۸ سرنخ سازمانی جدید استخراج‌شده در حوزه فین‌تک',
      type: 'approval',
    },
  ],
  id: [
    {
      id: 'att-1',
      agent: 'Kontroler Keuangan Rev',
      message: 'Setujui pengiriman pengingat pembayaran ke Parsian Group ($7.400 jatuh tempo)',
      type: 'payment',
    },
    {
      id: 'att-2',
      agent: 'Peneliti Prospek Rev',
      message: 'Kualifikasi 8 prospek perusahaan baru di sektor Fintech',
      type: 'approval',
    },
  ],
};

const ACTIVITY_STREAM_BY_LANG = {
  en: [
    {
      badge: 'CS',
      badgeClass: 'bg-[#3ab0a2]/20 text-[#3ab0a2]',
      agent: 'Rev Chief of Staff',
      time: '08:00 AM',
      message: 'Posted the daily brief: 3 action items require your decision.',
    },
    {
      badge: 'PM',
      badgeClass: 'bg-blue-500/20 text-blue-700',
      agent: 'Rev Project Manager',
      time: '09:15 AM',
      message: 'Task board synced: moved 4 completed tasks to done status.',
    },
    {
      badge: 'LR',
      badgeClass: 'bg-emerald-500/20 text-emerald-700',
      agent: 'Rev Lead Researcher',
      time: '10:30 AM',
      message: 'Scraped and scored 12 new B2B leads from target verticals.',
    },
    {
      badge: 'FC',
      badgeClass: 'bg-amber-500/20 text-amber-700',
      agent: 'Rev Finance Controller',
      time: '02:00 PM',
      message: 'Detected overdue invoice for Parsian Group ($7,400) and drafted reminder.',
    },
  ],
  fa: [
    {
      badge: 'رد',
      badgeClass: 'bg-[#3ab0a2]/20 text-[#3ab0a2]',
      agent: 'رئیس دفتر هوشمند رِو',
      time: '۰۸:۰۰ صبح',
      message: 'گزارش روزانه منتشر شد: ۳ مورد عملیاتی نیازمند تصمیم‌گیری شماست.',
    },
    {
      badge: 'مپ',
      badgeClass: 'bg-blue-500/20 text-blue-700',
      agent: 'مدیر پروژه هوشمند رِو',
      time: '۰۹:۱۵ صبح',
      message: 'تابلوی وظایف همگام‌سازی شد: ۴ وظیفه تکمیل‌شده به ستون انجام‌شده منتقل شد.',
    },
    {
      badge: 'پس',
      badgeClass: 'bg-emerald-500/20 text-emerald-700',
      agent: 'پژوهشگر سرنخ هوشمند رِو',
      time: '۱۰:۳۰ صبح',
      message: '۱۲ سرنخ سازمانی جدید از صنایع هدف شناسایی و امتیازدهی شد.',
    },
    {
      badge: 'کم',
      badgeClass: 'bg-amber-500/20 text-amber-700',
      agent: 'کنترلر مالی هوشمند رِو',
      time: '۰۲:۰۰ عصر',
      message: 'فاکتور معوق گروه پارسیان (۷٬۴۰۰ دلار) شناسایی و پیش‌نویس یادآوری آماده شد.',
    },
  ],
  id: [
    {
      badge: 'CS',
      badgeClass: 'bg-[#3ab0a2]/20 text-[#3ab0a2]',
      agent: 'Kepala Staf Rev',
      time: '08:00',
      message: 'Mengirim ringkasan harian: 3 item membutuhkan keputusan Anda.',
    },
    {
      badge: 'PM',
      badgeClass: 'bg-blue-500/20 text-blue-700',
      agent: 'Manajer Proyek Rev',
      time: '09:15',
      message: 'Papan tugas disinkronkan: 4 tugas selesai dipindahkan.',
    },
    {
      badge: 'LR',
      badgeClass: 'bg-emerald-500/20 text-emerald-700',
      agent: 'Peneliti Prospek Rev',
      time: '10:30',
      message: 'Menilai 12 prospek B2B baru dari sektor target.',
    },
    {
      badge: 'FC',
      badgeClass: 'bg-amber-500/20 text-amber-700',
      agent: 'Kontroler Keuangan Rev',
      time: '14:00',
      message: 'Mendeteksi faktur jatuh tempo Parsian Group ($7.400) dan menyiapkan pengingat.',
    },
  ],
};

export const RevWebApp: React.FC<RevWebAppProps> = ({ language }) => {
  const copy = WEBAPP_COPY[language];
  const [activeTab, setActiveTab] = useState<'dashboard' | 'agents' | 'leads' | 'tasks' | 'invoices'>('dashboard');

  // Keep user mutations independent of language so switching languages preserves live state cleanly
  const [agentStatusOverrides, setAgentStatusOverrides] = useState<Record<string, Agent['status']>>({});
  const [dismissedAttentionIds, setDismissedAttentionIds] = useState<string[]>([]);
  const [customTasks, setCustomTasks] = useState<TaskItem[]>([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [killSwitchActive, setKillSwitchActive] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const agents = getLocalizedAgents(language).map((ag) => ({
    ...ag,
    status: agentStatusOverrides[ag.id] ?? ag.status,
  }));
  const leads = getLocalizedLeads(language);
  const tasks = [...getLocalizedTasks(language), ...customTasks];
  const invoices = getLocalizedInvoices(language);
  const attentionItems = INITIAL_ATTENTION_BY_LANG[language].filter(
    (item) => !dismissedAttentionIds.includes(item.id)
  );
  const activityItems = ACTIVITY_STREAM_BY_LANG[language];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApproveAttention = (id: string, agentName: string) => {
    setDismissedAttentionIds((prev) => [...prev, id]);
    showToast(copy.approvedToast(agentName));
  };

  const handleDeclineAttention = (id: string) => {
    setDismissedAttentionIds((prev) => [...prev, id]);
    showToast(copy.declinedToast);
  };

  const toggleAgentStatus = (ag: Agent) => {
    const nextStatus: Agent['status'] = ag.status === 'active' ? 'paused' : 'active';
    setAgentStatusOverrides((prev) => ({ ...prev, [ag.id]: nextStatus }));
    showToast(copy.statusToast(ag.name, translateAgentStatus(nextStatus, language)));
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newTaskTitle.trim();
    if (!trimmed) return;
    setCustomTasks((prev) => [
      ...prev,
      {
        id: `t-${Date.now()}`,
        title: trimmed,
        owner: copy.taskOwnerYou,
        type: 'human',
        status: 'todo',
        dueDate: copy.taskDueSoon,
      },
    ]);
    setNewTaskTitle('');
    setIsAddingTask(false);
    showToast(copy.taskAddedToast);
  };

  const activeAgentsCount = agents.filter((a) => a.status === 'active').length;

  const taskColumnLabel = (statusKey: 'todo' | 'in_progress' | 'done') => {
    if (statusKey === 'todo') return copy.taskColTodo;
    if (statusKey === 'in_progress') return copy.taskColInProgress;
    return copy.taskColDone;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 end-6 z-50 bg-[#3ab0a2] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#3ab0a2]/50">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Workspace Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              {copy.workspaceTitle}
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#f4e3b5] text-slate-800 font-bold">
              {activeAgentsCount} {copy.onShiftSuffix}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{copy.systemStatus}</p>
        </div>

        {/* Global Kill Switch & Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const next = !killSwitchActive;
              setKillSwitchActive(next);
              showToast(next ? copy.killSwitchEngagedToast : copy.killSwitchResumedToast);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              killSwitchActive
                ? 'bg-red-600 text-white animate-pulse shadow-lg shadow-red-600/30'
                : 'bg-slate-100 text-red-600 border border-red-200 hover:bg-red-50'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            {killSwitchActive ? copy.killSwitchActive : copy.killSwitchIdle}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 px-6 flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'dashboard'
              ? 'border-[#3ab0a2] text-slate-900 bg-[#3ab0a2]/10'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Activity className="w-4 h-4 text-[#3ab0a2]" />
          {copy.tabDashboard}
        </button>
        <button
          onClick={() => setActiveTab('agents')}
          className={`px-4 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'agents'
              ? 'border-[#3ab0a2] text-slate-900 bg-[#3ab0a2]/10'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bot className="w-4 h-4 text-[#3ab0a2]" />
          {copy.tabAgents} ({agents.length})
        </button>
        <button
          onClick={() => setActiveTab('leads')}
          className={`px-4 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'leads'
              ? 'border-[#3ab0a2] text-slate-900 bg-[#3ab0a2]/10'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4 text-[#3ab0a2]" />
          {copy.tabLeads} ({leads.length})
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`px-4 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'tasks'
              ? 'border-[#3ab0a2] text-slate-900 bg-[#3ab0a2]/10'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Kanban className="w-4 h-4 text-[#3ab0a2]" />
          {copy.tabTasks} ({tasks.length})
        </button>
        <button
          onClick={() => setActiveTab('invoices')}
          className={`px-4 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'invoices'
              ? 'border-[#3ab0a2] text-slate-900 bg-[#3ab0a2]/10'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <DollarSign className="w-4 h-4 text-[#3ab0a2]" />
          {copy.tabInvoices}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 shadow-xs rounded-2xl p-5">
                <span className="text-xs text-slate-500 font-semibold">{copy.kpiLeadsLabel}</span>
                <div className="text-3xl font-extrabold font-mono-num text-slate-900 mt-2">11</div>
                <span className="text-[11px] text-[#3ab0a2] flex items-center gap-1 mt-1 font-bold">
                  <TrendingUp className="w-3.5 h-3.5" /> {copy.kpiLeadsDelta}
                </span>
              </div>
              <div className="bg-white border border-slate-200 shadow-xs rounded-2xl p-5">
                <span className="text-xs text-slate-500 font-semibold">{copy.kpiTasksLabel}</span>
                <div className="text-3xl font-extrabold font-mono-num text-slate-900 mt-2">23</div>
                <span className="text-[11px] text-slate-600 mt-1 block">{copy.kpiTasksSub}</span>
              </div>
              <div className="bg-white border border-slate-200 shadow-xs rounded-2xl p-5">
                <span className="text-xs text-slate-500 font-semibold">{copy.kpiRunsLabel}</span>
                <div className="text-3xl font-extrabold font-mono-num text-slate-900 mt-2">27</div>
                <span className="text-[11px] text-[#3ab0a2] mt-1 block font-semibold">{copy.kpiRunsSub}</span>
              </div>
              <div className="bg-white border border-slate-200 shadow-xs rounded-2xl p-5">
                <span className="text-xs text-slate-500 font-semibold">{copy.kpiArrLabel}</span>
                <div className="text-3xl font-extrabold text-slate-900 mt-2">{copy.kpiArrValue}</div>
                <span className="text-[11px] text-[#3ab0a2] mt-1 block font-semibold">{copy.kpiArrSub}</span>
              </div>
            </div>

            {/* Agent Efficiency (Past 7 Days) */}
            <AgentEfficiencyChart language={language} />

            {/* Attention Inbox & Live Activity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Attention Inbox */}
              <div className="lg:col-span-1 bg-white border border-slate-200 shadow-xs rounded-2xl p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    {copy.attentionTitle} ({attentionItems.length})
                  </h3>
                  <span className="text-[10px] bg-[#f4e3b5] text-slate-900 px-2 py-0.5 rounded font-bold">
                    {copy.needsApproval}
                  </span>
                </div>

                <div className="space-y-3 flex-1">
                  {attentionItems.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 text-xs">
                      <CheckCircle2 className="w-8 h-8 text-[#3ab0a2] mx-auto mb-2" />
                      {copy.allClear}
                    </div>
                  ) : (
                    attentionItems.map((item) => (
                      <div key={item.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="font-bold text-slate-900">{item.agent}</span>
                          <span>{copy.justNow}</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed">{item.message}</p>
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => handleApproveAttention(item.id, item.agent)}
                            className="flex-1 bg-[#3ab0a2] hover:bg-[#329c90] text-white py-1.5 px-3 rounded-lg text-xs font-bold transition-colors"
                          >
                            {copy.approveBtn}
                          </button>
                          <button
                            onClick={() => handleDeclineAttention(item.id)}
                            className="bg-slate-200 hover:bg-slate-300 text-slate-700 py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors"
                          >
                            {copy.declineBtn}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Live Activity Stream */}
              <div className="lg:col-span-2 bg-white border border-slate-200 shadow-xs rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#3ab0a2]" />
                    {copy.activityTitle}
                  </h3>
                  <span className="text-xs text-slate-500">{copy.activitySubtitle}</span>
                </div>

                <div className="space-y-4">
                  {activityItems.map((act, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-3.5 ${
                        idx < activityItems.length - 1 ? 'pb-4 border-b border-slate-100' : ''
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full font-bold flex items-center justify-center text-xs shrink-0 ${act.badgeClass}`}
                      >
                        {act.badge}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{act.agent}</span>
                          <span className="text-[10px] text-slate-400">{act.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{act.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AGENTS TAB */}
        {activeTab === 'agents' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{copy.agentsHeading}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{copy.agentsSub}</p>
              </div>
              <button
                onClick={() => showToast(copy.hireAgentToast)}
                className="bg-[#3ab0a2] hover:bg-[#329c90] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
              >
                {copy.hireAgentBtn}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {agents.map((ag, idx) => (
                <div
                  key={ag.id}
                  className="bg-white border border-slate-200 shadow-xs rounded-2xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={ag.avatar}
                          alt={ag.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">{ag.name}</h3>
                          <span className="text-xs text-slate-500">{ag.role}</span>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${
                          ag.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {translateAgentStatus(ag.status, language)}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mb-4 leading-relaxed">{ag.description}</p>

                    <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                      <div className="flex justify-between">
                        <span>{copy.trustLevelLabel}</span>
                        <span className="font-bold text-[#3ab0a2]">
                          {translateTrustLevel(ag.trustLevel, language)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>{copy.scheduleLabel}</span>
                        <span className="text-slate-900">{ag.schedule}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{copy.runsTodayLabel}</span>
                        <span className="text-slate-900 font-semibold">
                          {ag.todayRuns} {copy.runsUnit}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-6 border-t border-slate-100">
                    <button
                      onClick={() => toggleAgentStatus(ag)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                        ag.status === 'active'
                          ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                          : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      }`}
                    >
                      {ag.status === 'active' ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5" />
                      )}
                      {ag.status === 'active' ? copy.pauseAgent : copy.resumeAgent}
                    </button>
                    <span className="text-[10px] text-slate-400">
                      {copy.idLabel} {language === 'fa' ? `عامل-${idx + 1}` : ag.id}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LEADS TAB */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{copy.leadsHeading}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{copy.leadsSub}</p>
              </div>
              <button
                onClick={() => showToast(copy.addLeadToast)}
                className="bg-[#3ab0a2] hover:bg-[#329c90] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
              >
                {copy.addLeadBtn}
              </button>
            </div>

            <div className="bg-white border border-slate-200 shadow-xs rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-start border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                      <th className="p-4 font-bold text-start">{copy.colCompany}</th>
                      <th className="p-4 font-bold text-start">{copy.colContact}</th>
                      <th className="p-4 font-bold text-start">{copy.colScore}</th>
                      <th className="p-4 font-bold text-start">{copy.colStage}</th>
                      <th className="p-4 font-bold text-start">{copy.colSource}</th>
                      <th className="p-4 font-bold text-start">{copy.colLastTouch}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leads.map((l) => (
                      <tr key={l.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 font-bold text-slate-900">{l.company}</td>
                        <td className="p-4 text-slate-700">{l.contactName}</td>
                        <td className="p-4 font-mono-num font-bold text-[#3ab0a2]">{l.score}/100</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full bg-[#f4e3b5] text-slate-900 font-bold text-[11px]">
                            {translateLeadStage(l.stage, language)}
                          </span>
                        </td>
                        <td className="p-4 text-slate-600">{l.source}</td>
                        <td className="p-4 text-slate-500">{l.lastTouch}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TASKS TAB */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{copy.tasksHeading}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{copy.tasksSub}</p>
              </div>
              <button
                onClick={() => setIsAddingTask((prev) => !prev)}
                className="bg-[#3ab0a2] hover:bg-[#329c90] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                {copy.createTaskBtn.replace(/^\+\s*/, '')}
              </button>
            </div>

            {isAddingTask && (
              <form
                onSubmit={handleCreateTask}
                className="bg-white border border-slate-200 shadow-xs rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
              >
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder={copy.taskPlaceholder}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-[#3ab0a2]"
                />
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#3ab0a2] hover:bg-[#329c90] text-white rounded-xl text-xs font-bold"
                  >
                    {copy.taskSaveBtn}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingTask(false);
                      setNewTaskTitle('');
                    }}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                  >
                    {copy.taskCancelBtn}
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(['todo', 'in_progress', 'done'] as const).map((statusKey) => (
                <div key={statusKey} className="bg-white border border-slate-200 shadow-xs rounded-2xl p-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span>{taskColumnLabel(statusKey)}</span>
                    <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-bold">
                      {tasks.filter((t) => t.status === statusKey).length}
                    </span>
                  </h3>
                  <div className="space-y-3">
                    {tasks
                      .filter((t) => t.status === statusKey)
                      .map((t) => (
                        <div key={t.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                          <p className="text-xs font-bold text-slate-900 leading-relaxed">{t.title}</p>
                          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                            <span
                              className={`px-2 py-0.5 rounded font-bold ${
                                t.type === 'agent'
                                  ? 'bg-[#3ab0a2]/20 text-[#2a8a7e]'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {t.owner}
                            </span>
                            <span>{t.dueDate}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INVOICES TAB */}
        {activeTab === 'invoices' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{copy.invoicesHeading}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{copy.invoicesSub}</p>
              </div>
              <button
                onClick={() => showToast(copy.createInvoiceToast)}
                className="bg-[#3ab0a2] hover:bg-[#329c90] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
              >
                {copy.createInvoiceBtn}
              </button>
            </div>

            <div className="bg-white border border-slate-200 shadow-xs rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-start border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                      <th className="p-4 font-bold text-start">{copy.colInvoiceId}</th>
                      <th className="p-4 font-bold text-start">{copy.colClient}</th>
                      <th className="p-4 font-bold text-start">{copy.colAmount}</th>
                      <th className="p-4 font-bold text-start">{copy.colStatus}</th>
                      <th className="p-4 font-bold text-start">{copy.colDueDate}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 font-bold text-[#3ab0a2]">{inv.id}</td>
                        <td className="p-4 font-bold text-slate-900">{inv.client}</td>
                        <td className="p-4 font-bold text-slate-900">{inv.amount}</td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                              inv.status === 'Paid'
                                ? 'bg-emerald-100 text-emerald-800'
                                : inv.status === 'Overdue'
                                ? 'bg-red-100 text-red-800'
                                : inv.status === 'Sent'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-slate-100 text-slate-800'
                            }`}
                          >
                            {translateInvoiceStatus(inv.status, language)}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500">{inv.dueDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
