import { Agent, BlogPost, Invoice, Language, Lead, SubscriptionPlan, TaskItem } from '../types';

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'agent-1',
    name: 'Rev Chief of Staff',
    role: 'Executive Coordination & Daily Briefs',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    trustLevel: 'Propose',
    schedule: 'Every weekday at 08:00',
    status: 'active',
    todayRuns: 3,
    description: 'Reads workspace activity, synthesizes bottlenecks, and posts daily morning briefs.'
  },
  {
    id: 'agent-2',
    name: 'Rev Project Manager',
    role: 'Task Board & Delivery Tracking',
    avatar: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=150&auto=format&fit=crop&q=80',
    trustLevel: 'Act with approval',
    schedule: 'Hourly sync',
    status: 'active',
    todayRuns: 12,
    description: 'Keeps task boards accurate, flags overdue deliverables, and updates project milestones.'
  },
  {
    id: 'agent-3',
    name: 'Rev Finance Controller',
    role: 'Invoicing, Cashflow & Payment Chasing',
    avatar: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=150&auto=format&fit=crop&q=80',
    trustLevel: 'Propose',
    schedule: 'Daily at 14:00',
    status: 'active',
    todayRuns: 4,
    description: 'Identifies overdue invoices, drafts polite payment reminders, and monitors cash burn.'
  },
  {
    id: 'agent-4',
    name: 'Rev Lead Researcher',
    role: 'B2B Lead Scorer & Enrichment',
    avatar: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=150&auto=format&fit=crop&q=80',
    trustLevel: 'Autonomous',
    schedule: 'Every 4 hours',
    status: 'active',
    todayRuns: 8,
    description: 'Researches prospects across the live web and delivers scored B2B leads directly to CRM.'
  }
];

const AGENTS_FA: Agent[] = [
  {
    ...INITIAL_AGENTS[0],
    name: 'رئیس دفتر هوشمند رِو',
    role: 'هماهنگی اجرایی و گزارش‌های روزانه',
    schedule: 'هر روز کاری ساعت ۰۸:۰۰',
    description: 'فعالیت‌های فضای کاری را رصد می‌کند، گلوگاه‌ها را جمع‌بندی کرده و گزارش صبحگاهی روزانه ارسال می‌کند.'
  },
  {
    ...INITIAL_AGENTS[1],
    name: 'مدیر پروژه هوشمند رِو',
    role: 'تابلوی وظایف و پیگیری تحویل‌ها',
    schedule: 'همگام‌سازی هر یک ساعت',
    description: 'تابلوی وظایف را به‌روز نگه می‌دارد، تحویل‌های معوق را هشدار می‌دهد و مراحل پروژه را به‌روزرسانی می‌کند.'
  },
  {
    ...INITIAL_AGENTS[2],
    name: 'کنترلر مالی هوشمند رِو',
    role: 'صدور فاکتور، جریان نقدی و پیگیری پرداخت‌ها',
    schedule: 'روزانه ساعت ۱۴:۰۰',
    description: 'فاکتورهای سررسید گذشته را شناسایی کرده، یادآوری پرداخت محترمانه پیش‌نویس می‌کند و روند نقدینگی را پایش می‌کند.'
  },
  {
    ...INITIAL_AGENTS[3],
    name: 'پژوهشگر سرنخ هوشمند رِو',
    role: 'امتیازدهی و غنی‌سازی سرنخ‌های سازمانی',
    schedule: 'هر ۴ ساعت یک‌بار',
    description: 'مشتریان بالقوه را در وب زنده بررسی کرده و سرنخ‌های امتیازدهی‌شده را مستقیماً به سیستم مدیریت مشتری تحویل می‌دهد.'
  }
];

export function getLocalizedAgents(language: Language): Agent[] {
  return language === 'fa' ? AGENTS_FA : INITIAL_AGENTS;
}

export const INITIAL_LEADS: Lead[] = [
  { id: 'lead-1', company: 'Nava Health', contactName: 'Araz Ostadi', score: 94, stage: 'Meeting Booked', source: 'Rev Sales Agent', lastTouch: '12m ago' },
  { id: 'lead-2', company: 'Tadbirnegar Tech', contactName: 'Arash Khezerloo', score: 88, stage: 'Proposal', source: 'Web Inbound', lastTouch: '1h ago' },
  { id: 'lead-3', company: 'Parsian Logistics', contactName: 'Farhad Shah', score: 91, stage: 'Qualified', source: 'B2B Lead Gen', lastTouch: '3h ago' },
  { id: 'lead-4', company: 'Zist Parsian', contactName: 'Selin Aksoy', score: 79, stage: 'New', source: 'WhatsApp Chat', lastTouch: '5h ago' }
];

const LEADS_FA: Lead[] = [
  { id: 'lead-1', company: 'سلامت نوا', contactName: 'آراز استادی', score: 94, stage: 'Meeting Booked', source: 'عامل فروش رِو', lastTouch: '۱۲ دقیقه پیش' },
  { id: 'lead-2', company: 'فناوری تدبیرنگار', contactName: 'آرش خضرلو', score: 88, stage: 'Proposal', source: 'ورودی وب‌سایت', lastTouch: '۱ ساعت پیش' },
  { id: 'lead-3', company: 'لجستیک پارسیان', contactName: 'فرهاد شاه', score: 91, stage: 'Qualified', source: 'جذب سرنخ سازمانی', lastTouch: '۳ ساعت پیش' },
  { id: 'lead-4', company: 'زیست پارسیان', contactName: 'سلین آکسوی', score: 79, stage: 'New', source: 'گفت‌وگوی واتساپ', lastTouch: '۵ ساعت پیش' }
];

export function getLocalizedLeads(language: Language): Lead[] {
  return language === 'fa' ? LEADS_FA : INITIAL_LEADS;
}

export const INITIAL_TASKS: TaskItem[] = [
  { id: 'task-1', title: 'Approve Q3 enterprise contract terms', owner: 'Farhad (Owner)', type: 'human', status: 'review', dueDate: 'Today' },
  { id: 'task-2', title: 'Synthesize dealer support ticket sentiment', owner: 'Rev Chief of Staff', type: 'agent', status: 'done', dueDate: 'Today' },
  { id: 'task-3', title: 'Review automated tax filing report', owner: 'Rev Finance Controller', type: 'agent', status: 'in_progress', dueDate: 'Tomorrow' },
  { id: 'task-4', title: 'Finalize custom integrations architecture', owner: 'Rev Project Manager', type: 'agent', status: 'todo', dueDate: 'Nov 22' }
];

const TASKS_FA: TaskItem[] = [
  { id: 'task-1', title: 'تایید شرایط قرارداد سازمانی فصل سوم', owner: 'فرهاد (مالک)', type: 'human', status: 'review', dueDate: 'امروز' },
  { id: 'task-2', title: 'تحلیل رضایت تیکت‌های پشتیبانی نمایندگان', owner: 'رئیس دفتر هوشمند رِو', type: 'agent', status: 'done', dueDate: 'امروز' },
  { id: 'task-3', title: 'بررسی گزارش خودکار اظهارنامه مالیاتی', owner: 'کنترلر مالی هوشمند رِو', type: 'agent', status: 'in_progress', dueDate: 'فردا' },
  { id: 'task-4', title: 'نهایی‌سازی معماری یکپارچه‌سازی‌های سفارشی', owner: 'مدیر پروژه هوشمند رِو', type: 'agent', status: 'todo', dueDate: '۱ آذر' }
];

export function getLocalizedTasks(language: Language): TaskItem[] {
  return language === 'fa' ? TASKS_FA : INITIAL_TASKS;
}

export const INITIAL_INVOICES: Invoice[] = [
  { id: 'INV-2026-001', client: 'Nava Health Corp', amount: '$4,850.00', status: 'Paid', dueDate: 'Nov 15, 2026' },
  { id: 'INV-2026-002', client: 'Tadbirnegar Ltd', amount: '$2,100.00', status: 'Sent', dueDate: 'Nov 25, 2026' },
  { id: 'INV-2026-003', client: 'Parsian Group', amount: '$7,400.00', status: 'Overdue', dueDate: 'Nov 10, 2026' },
  { id: 'INV-2026-004', client: 'Zist Digital', amount: '$1,500.00', status: 'Draft', dueDate: 'Dec 01, 2026' }
];

const INVOICES_FA: Invoice[] = [
  { id: '۱۴۰۵-۰۰۱', client: 'شرکت سلامت نوا', amount: '۴٬۸۵۰ دلار', status: 'Paid', dueDate: '۲۴ آبان ۱۴۰۵' },
  { id: '۱۴۰۵-۰۰۲', client: 'شرکت تدبیرنگار', amount: '۲٬۱۰۰ دلار', status: 'Sent', dueDate: '۴ آذر ۱۴۰۵' },
  { id: '۱۴۰۵-۰۰۳', client: 'گروه پارسیان', amount: '۷٬۴۰۰ دلار', status: 'Overdue', dueDate: '۱۹ آبان ۱۴۰۵' },
  { id: '۱۴۰۵-۰۰۴', client: 'زیست دیجیتال', amount: '۱٬۵۰۰ دلار', status: 'Draft', dueDate: '۱۰ آذر ۱۴۰۵' }
];

export function getLocalizedInvoices(language: Language): Invoice[] {
  return language === 'fa' ? INVOICES_FA : INITIAL_INVOICES;
}

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'story-1',
    title: 'How Rev Automated 24/7 Dealer Support in Two Weeks',
    excerpt: 'Selin set up a Rev Support Agent instead of hiring a third person. It now handles questions around the clock for $99 a month.',
    category: 'Customer Story',
    author: 'Selin Aksoy',
    date: 'Nov 14, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
    seoKeywords: ['Rev Support Agent', 'Dealer Support', 'Fractional COO', 'Customer Service Automation'],
    content: `Selin's client was about to hire a third person to answer dealer questions about prices, stock and delivery dates. She set up a Rev Support Agent instead. It now handles most questions around the clock for $99 a month, and Selin has a repeatable implementation offer.`
  },
  {
    id: 'story-2',
    title: 'From Next-Day Callbacks to 4 Minutes: How Rev Rebuilt Brokerage Lead Follow-up',
    excerpt: 'Omar used to sell CRM audits. Now he sells a speed-to-lead sprint: a Rev Sales Agent that replies to every lead within minutes.',
    category: 'RevOps',
    author: 'Omar Vance',
    date: 'Nov 10, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    seoKeywords: ['Speed-to-Lead', 'RevOps', 'Rev Sales Agent', 'Lead Qualification'],
    content: `Omar used to sell CRM audits. Now he sells a speed-to-lead sprint: a Rev Sales Agent that replies to every brokerage lead within minutes and hands agents only the people who answered. His client closes about 3 more deals a month for $99 a month in software.`
  }
];

const BLOG_POSTS_FA: BlogPost[] = [
  {
    id: 'story-1',
    title: 'چگونه رِو پشتیبانی ۲۴ ساعته نمایندگان را ظرف دو هفته خودکار کرد',
    excerpt: 'سلین به جای استخدام نفر سوم، یک عامل پشتیبانی رِو راه‌اندازی کرد. اکنون بیشتر سوالات به‌صورت شبانه‌روزی با هزینه ماهانه ۹۹ دلار پاسخ داده می‌شوند.',
    category: 'داستان مشتری',
    author: 'سلین آکسوی',
    date: '۲۳ آبان ۱۴۰۵',
    readTime: '۶ دقیقه مطالعه',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
    seoKeywords: ['عامل پشتیبانی رِو', 'پشتیبانی نمایندگان', 'اتوماسیون خدمات مشتری', 'رشد کسب‌وکار'],
    content: 'مشتری سلین در آستانه استخدام نیروی سوم برای پاسخ به سوالات نمایندگان درباره قیمت، موجودی و زمان تحویل بود. او به جای این کار یک عامل پشتیبانی رِو راه‌اندازی کرد. اکنون بیشتر سوالات به‌صورت شبانه‌روزی با هزینه ماهانه ۹۹ دلار مدیریت می‌شوند و سلین یک خدمت پیاده‌سازی تکرارپذیر برای مشتریان خود دارد.'
  },
  {
    id: 'story-2',
    title: 'از تماس روز بعد تا ۴ دقیقه: بازطراحی پیگیری سرنخ‌های کارگزاری با رِو',
    excerpt: 'عمر پیش‌تر ممیزی مدیریت مشتری می‌فروخت. اکنون سرویس پاسخ‌گویی سریع را با عامل فروش رِو ارائه می‌دهد که ظرف چند دقیقه به هر سرنخ پاسخ می‌دهد.',
    category: 'عملیات درآمد',
    author: 'عمر ونس',
    date: '۱۹ آبان ۱۴۰۵',
    readTime: '۶ دقیقه مطالعه',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    seoKeywords: ['سرعت پاسخ به سرنخ', 'عملیات فروش', 'عامل فروش رِو', 'ارزیابی سرنخ'],
    content: 'عمر پیش‌تر خدمات بررسی سیستم مدیریت مشتری ارائه می‌داد. اکنون او بسته سرعت پاسخ به سرنخ را با عامل فروش رِو پیاده‌سازی می‌کند که ظرف چند دقیقه به تمام سرنخ‌های کارگزاری پاسخ داده و تنها افراد واجد شرایط را به کارشناسان ارجاع می‌دهد. مشتری او ماهانه حدود ۳ معامله بیشتر می‌بندد.'
  }
];

export function getLocalizedBlogPosts(language: Language): BlogPost[] {
  return language === 'fa' ? BLOG_POSTS_FA : INITIAL_BLOG_POSTS;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter Agent',
    price: '$99',
    period: '/month',
    description: 'Perfect for solo founders and single departments looking to automate routine tasks.',
    features: [
      '1 Customer-Facing Rev Agent',
      'Unlimited conversations & leads',
      'Attention Inbox & Telegram alerts',
      'Propose trust level workflows',
      'Standard data export (JSON/CSV)'
    ]
  },
  {
    id: 'platform',
    name: 'Rev Pro Workspace',
    price: '$399',
    period: '/month',
    popular: true,
    description: 'The complete AI employee operating system for your entire company.',
    features: [
      'Unlimited Rev AI Employees & Team Members',
      'Full Business Workspace (CRM, Tasks, Invoices)',
      '4 Trust Levels & Global Kill Switch',
      'Bring your own Anthropic / Gemini API Key',
      'Custom scheduling & Telegram bridge',
      'Priority 24/7 support & setup assistance'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise Self-Hosted',
    price: '$1,299',
    period: '/month',
    description: 'For organizations requiring dedicated infrastructure, VPC isolation, and custom training.',
    features: [
      'Deployed on your own private cloud or server',
      'Custom fine-tuned Rev models',
      'Advanced RBAC & audit logging',
      'Dedicated account engineer',
      'SLA guarantee & compliance reports'
    ]
  }
];

const SUBSCRIPTION_PLANS_FA: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'عامل پایه',
    price: '۹۹ دلار',
    period: '/ماه',
    description: 'مناسب برای بنیان‌گذاران مستقل و یک واحد کاری جهت خودکارسازی کارهای روزمره.',
    features: [
      '۱ عامل هوشمند ارتباط با مشتری رِو',
      'گفت‌وگوها و سرنخ‌های نامحدود',
      'صندوق توجه و هشدارهای تلگرام',
      'گردش‌کار سطح اعتماد پیشنهادی',
      'خروجی استاندارد داده‌ها'
    ]
  },
  {
    id: 'platform',
    name: 'فضای کاری حرفه‌ای رِو',
    price: '۳۹۹ دلار',
    period: '/ماه',
    popular: true,
    description: 'سیستم‌عامل کامل کارمندان هوش مصنوعی برای کل سازمان شما.',
    features: [
      'کارمندان هوش مصنوعی و اعضای تیم نامحدود',
      'فضای کاری کامل کسب‌وکار (مشتریان، وظایف، فاکتورها)',
      '۴ سطح اعتماد و کلید توقف اضطراری سراسری',
      'اتصال مستقیم به کلید هوش مصنوعی اختصاصی سازمان',
      'زمان‌بندی سفارشی و پل ارتباطی تلگرام',
      'پشتیبانی اولویت‌دار ۲۴ ساعته و همراهی در راه‌اندازی'
    ]
  },
  {
    id: 'enterprise',
    name: 'نسخه سازمانی اختصاصی',
    price: '۱٬۲۹۹ دلار',
    period: '/ماه',
    description: 'برای سازمان‌هایی که نیازمند زیرساخت اختصاصی، شبکه ایزوله و آموزش مدل سفارشی هستند.',
    features: [
      'استقرار روی ابر خصوصی یا سرور داخلی سازمان شما',
      'مدل‌های هوش مصنوعی سفارشی‌سازی‌شده برای رِو',
      'کنترل دسترسی پیشرفته و ثبت کامل گزارش‌های ممیزی',
      'مهندس اختصاصی همراه سازمان',
      'تضمین سطح کیفیت سرویس و گزارش‌های انطباق'
    ]
  }
];

export function getLocalizedPlans(language: Language): SubscriptionPlan[] {
  return language === 'fa' ? SUBSCRIPTION_PLANS_FA : SUBSCRIPTION_PLANS;
}

export const FAQS = [
  {
    q: 'What is Rev Platform?',
    a: 'Rev Platform is an autonomous AI agent platform and workplace operating system where AI employees with roles, trust levels, and approvals work next to your team on customers, leads, deals, projects, tasks, invoices, and marketing.'
  },
  {
    q: 'How do Rev AI agents work?',
    a: 'Rev agents run on their own schedule or respond in real-time, working directly inside your business records while keeping your team in control through trust levels and approvals.'
  },
  {
    q: 'What can a Rev agent do without asking me?',
    a: 'Depending on its trust level (Observe, Propose, Act with approval, or Autonomous), an agent can read records, draft emails, research leads, and update CRM stages. Money movement and record deletions always require your approval.'
  },
  {
    q: 'Is my company data secure?',
    a: 'Yes. Data is isolated per organization with enterprise-grade encryption. You can export or delete your data at any time.'
  }
];

const FAQS_FA = [
  {
    q: 'پلتفرم رِو چیست؟',
    a: 'پلتفرم رِو یک سامانه کارمندان هوش مصنوعی خودکار و سیستم‌عامل فضای کاری است که در آن عوامل هوشمند با نقش، سطح اعتماد و فرآیند تایید در کنار تیم شما روی مشتریان، سرنخ‌ها، معاملات، پروژه‌ها، وظایف، فاکتورها و بازاریابی کار می‌کنند.'
  },
  {
    q: 'عوامل هوش مصنوعی رِو چگونه کار می‌کنند؟',
    a: 'عوامل رِو بر اساس زمان‌بندی مشخص یا به‌صورت لحظه‌ای اجرا می‌شوند و مستقیماً روی سوابق کسب‌وکار شما فعالیت می‌کنند؛ در عین حال تیم شما از طریق سطوح اعتماد و تاییدیه‌ها کنترل کامل را حفظ می‌کند.'
  },
  {
    q: 'یک عامل رِو بدون اجازه من چه کارهایی می‌تواند انجام دهد؟',
    a: 'بسته به سطح اعتماد (مشاهده، پیشنهاد، اقدام با تایید یا خودمختار)، عامل می‌تواند سوابق را بخواند، پیام پیش‌نویس کند، سرنخ‌ها را پژوهش کند و مراحل فروش را به‌روزرسانی کند. عملیات مالی و حذف سوابق همیشه نیازمند تایید شما هستند.'
  },
  {
    q: 'آیا داده‌های شرکت من امن است؟',
    a: 'بله. داده‌ها برای هر سازمان به‌صورت کاملاً ایزوله و با رمزنگاری سطح سازمانی نگهداری می‌شوند و هر زمان که بخواهید می‌توانید از آن‌ها خروجی بگیرید یا حذف‌شان کنید.'
  }
];

export function getLocalizedFaqs(language: Language): { q: string; a: string }[] {
  return language === 'fa' ? FAQS_FA : FAQS;
}

export function translateTrustLevel(level: Agent['trustLevel'], language: Language): string {
  if (language !== 'fa') return level;
  switch (level) {
    case 'Observe':
      return 'مشاهده';
    case 'Propose':
      return 'پیشنهاد';
    case 'Act with approval':
      return 'اقدام با تایید';
    case 'Autonomous':
      return 'خودمختار';
  }
}

export function translateAgentStatus(status: Agent['status'], language: Language): string {
  if (language !== 'fa') return status;
  switch (status) {
    case 'active':
      return 'فعال';
    case 'paused':
      return 'متوقف';
    case 'running':
      return 'در حال اجرا';
  }
}

export function translateLeadStage(stage: Lead['stage'], language: Language): string {
  if (language !== 'fa') return stage;
  switch (stage) {
    case 'New':
      return 'جدید';
    case 'Qualified':
      return 'واجد شرایط';
    case 'Meeting Booked':
      return 'جلسه رزرو شده';
    case 'Proposal':
      return 'ارسال پیشنهاد';
    case 'Closed Won':
      return 'موفقیت معامله';
  }
}

export function translateInvoiceStatus(status: Invoice['status'], language: Language): string {
  if (language !== 'fa') return status;
  switch (status) {
    case 'Paid':
      return 'پرداخت‌شده';
    case 'Sent':
      return 'ارسال‌شده';
    case 'Overdue':
      return 'معوق';
    case 'Draft':
      return 'پیش‌نویس';
  }
}

export const TRANSLATIONS = {
  en: {
    brandTitle: 'Rev Platform',
    brandSubtitle: 'Autonomous Workforce',
    navPlatform: 'Platform',
    navAgents: 'AI Agents',
    navCalculator: 'ROI Calculator',
    navStories: 'Stories',
    navPricing: 'Pricing',
    navBlog: 'Blog',
    navFaq: 'FAQ',
    openWebApp: 'Open Rev Web App',
    backToWebsite: 'Back to Website',
    requestDemo: 'Request Demo',
    buyNow: 'Buy Rev Pro Now',
    heroKicker: 'The autonomous AI employee platform',
    heroTitle: 'AI agents do the work. Your team approves what matters.',
    heroSubtitle: 'Rev Platform gives every AI employee a role, permissions, and trust levels, placing your customers, leads, deals, projects, and invoices in one lightning-fast workspace.',
    explorePlatform: 'Explore Platform',
    startTrial: 'Start 14-Day Free Trial',
    statsHeading: 'Hours ahead of competitors who work by hand',
    calculatorTitle: 'Free Rev AI ROI Calculator',
    calculatorSubtitle: 'Calculate your team hours saved over 24 months.',
    pricingTitle: 'Simple, Predictable Pricing',
    pricingSubtitle: 'One flat price per organization. Unlimited AI agents and team members.',
    dashboardTitle: 'Rev Operational Workspace',
    dashboardSubtitle: 'Live control over your AI workforce and business pipeline.',
    featuresTitle: 'Why High-Growth Companies Choose Rev',
    testimonialsTitle: 'Loved by Founders & RevOps Leaders',
  },
  fa: {
    brandTitle: 'Rev Platform',
    brandSubtitle: 'نیروی کار هوشمند خودکار',
    navPlatform: 'پلتفرم',
    navAgents: 'عوامل هوش مصنوعی',
    navCalculator: 'محاسبه‌گر سود',
    navStories: 'داستان‌ها',
    navPricing: 'تعرفه‌ها',
    navBlog: 'وبلاگ',
    navFaq: 'سوالات متداول',
    openWebApp: 'باز کردن وب اپ رِو',
    backToWebsite: 'بازگشت به وب‌سایت',
    requestDemo: 'درخواست دمو',
    buyNow: 'خرید نسخه حرفه‌ای رِو',
    heroKicker: 'پلتفرم پیشرفته کارمندان هوش مصنوعی',
    heroTitle: 'عوامل هوش مصنوعی کارها را انجام می‌دهند. تیم شما موارد مهم را تایید می‌کند.',
    heroSubtitle: 'پلتفرم رِو به هر کارمند هوش مصنوعی نقش، دسترسی و سطح اعتماد می‌دهد تا مشتریان، معاملات، پروژه‌ها و فاکتورهای شما را به‌صورت خودکار مدیریت کند.',
    explorePlatform: 'بررسی پلتفرم',
    startTrial: 'شروع آزمایشی ۱۴ روزه رایگان',
    statsHeading: 'ساعت‌ها جلوتر از رقبا با اتوماسیون هوش مصنوعی',
    calculatorTitle: 'محاسبه‌گر رایگان بازگشت سرمایه رِو',
    calculatorSubtitle: 'محاسبه ساعات صرفه‌جویی‌شده تیم شما طی ۲۴ ماه.',
    pricingTitle: 'قیمت‌گذاری ساده و شفاف',
    pricingSubtitle: 'یک قیمت ثابت برای هر سازمان. تعداد نامحدود عوامل و اعضای تیم.',
    dashboardTitle: 'فضای کاری عملیاتی رِو',
    dashboardSubtitle: 'کنترل زنده بر نیروی کار هوش مصنوعی و قیف فروش کسب‌وکار.',
    featuresTitle: 'چرا شرکت‌های پیشرو رِو را انتخاب می‌کنند؟',
    testimonialsTitle: 'مورد اعتماد مدیران و رهبران کسب‌وکار',
  },
  id: {
    brandTitle: 'Rev Platform',
    brandSubtitle: 'Tenaga Kerja Otonom',
    navPlatform: 'Platform',
    navAgents: 'Agen AI',
    navCalculator: 'Kalkulator ROI',
    navStories: 'Cerita',
    navPricing: 'Harga',
    navBlog: 'Blog',
    navFaq: 'FAQ',
    openWebApp: 'Buka Web App Rev',
    backToWebsite: 'Kembali ke Situs',
    requestDemo: 'Minta Demo',
    buyNow: 'Beli Rev Pro Sekarang',
    heroKicker: 'Platform karyawan AI otonom untuk bisnis modern',
    heroTitle: 'Agen AI yang bekerja. Tim Anda menyetujui yang penting.',
    heroSubtitle: 'Rev Platform memberikan setiap karyawan AI peran, izin, dan tingkat kepercayaan dalam satu ruang kerja yang sangat cepat.',
    explorePlatform: 'Jelajahi Platform',
    startTrial: 'Mulai Uji Coba Gratis 14 Hari',
    statsHeading: 'Jam lebih unggul dari kompetitor yang bekerja manual',
    calculatorTitle: 'Kalkulator ROI AI Rev',
    calculatorSubtitle: 'Hitung penghematan jam kerja tim Anda selama 24 bulan.',
    pricingTitle: 'Harga Sederhana & Transparan',
    pricingSubtitle: 'Satu harga tetap per organisasi. Agen AI dan anggota tim tak terbatas.',
    dashboardTitle: 'Ruang Kerja Operasional Rev',
    dashboardSubtitle: 'Kendali langsung atas tenaga kerja AI dan pipa bisnis Anda.',
    featuresTitle: 'Mengapa Perusahaan Memilih Rev',
    testimonialsTitle: 'Dicintai oleh Pendiri & Pemimpin Bisnis',
  }
};
