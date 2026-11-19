import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, ShieldCheck, Zap, ArrowRight, CheckCircle2, Play, 
  Lock, RefreshCw, Calculator, Users, Building2, HelpCircle, 
  ChevronDown, Star, Sparkles, Terminal, FileText, Check, TrendingUp
} from 'lucide-react';
import { getLocalizedFaqs, getLocalizedPlans, TRANSLATIONS } from '../data/mockData';
import { Language } from '../types';
import { ExplodedRobotHero } from './ExplodedRobotHero';
import { HeroExplodedBackground } from './HeroExplodedBackground';
import { IndonesiaFlagMap } from './IndonesiaFlagMap';
import {
  computeExplodeLayerFactor,
  computeScrollProgress,
  lerp,
} from '../utils/scrollScrub';

interface MarketingWebsiteProps {
  language: Language;
  onOpenDemoModal: () => void;
  onOpenWebApp: () => void;
  onNavigateBlog: () => void;
  onNavigateBilling: () => void;
}

export const MarketingWebsite: React.FC<MarketingWebsiteProps> = ({
  language,
  onOpenDemoModal,
  onOpenWebApp,
  onNavigateBlog,
  onNavigateBilling
}) => {
  const t = TRANSLATIONS[language];
  const plans = getLocalizedPlans(language);
  const faqs = getLocalizedFaqs(language);
  const arrowDir = language === 'fa' ? 'rotate-180' : '';

  // ROI Calculator state
  const [teamSize, setTeamSize] = useState(8);
  const [repeatHours, setRepeatHours] = useState(12);
  const [aiShare, setAiShare] = useState(50);

  // FAQ open state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Scroll-scrubbed progress (0 -> 1) driving both the 119 robot video frames and .exploded-layer transforms
  const heroSectionRef = useRef<HTMLElement>(null);
  const robotRunwayRef = useRef<HTMLDivElement>(null);
  const [robotScrollProgress, setRobotScrollProgress] = useState(0);

  useEffect(() => {
    const heroEl = heroSectionRef.current;
    const runwayEl = robotRunwayRef.current;
    if (!heroEl || !runwayEl) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let targetProgress = 0;
    let currentProgress = 0;
    let rafId: number | null = null;

    const computeTarget = () => {
      const rect = runwayEl.getBoundingClientRect();
      const runwayTopDoc = rect.top + window.scrollY;
      const runwayEndScroll = Math.max(
        runwayTopDoc + runwayEl.offsetHeight - window.innerHeight,
        600
      );
      return computeScrollProgress(window.scrollY, runwayEndScroll);
    };

    const applyProgress = (p: number) => {
      const explodeFactor = computeExplodeLayerFactor(p);
      heroEl.style.setProperty('--explode-progress', explodeFactor.toFixed(4));
      setRobotScrollProgress(p);
    };

    const tick = () => {
      if (prefersReducedMotion) {
        currentProgress = targetProgress;
        applyProgress(currentProgress);
        rafId = null;
        return;
      }

      const diff = Math.abs(targetProgress - currentProgress);
      if (diff < 0.0008) {
        currentProgress = targetProgress;
        applyProgress(currentProgress);
        rafId = null;
        return;
      }

      currentProgress = lerp(currentProgress, targetProgress, 0.22);
      applyProgress(currentProgress);
      rafId = window.requestAnimationFrame(tick);
    };

    const handleScroll = () => {
      targetProgress = computeTarget();
      if (rafId === null) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    targetProgress = computeTarget();
    currentProgress = targetProgress;
    applyProgress(currentProgress);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Calculated ROI values
  const hoursPerWeek = (teamSize * repeatHours * (aiShare / 100)).toFixed(1);
  const fullTimeEquivalent = (Number(hoursPerWeek) / 40).toFixed(1);
  const hours24Months = Math.round(Number(hoursPerWeek) * 104);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-[#3ab0a2] selection:text-white">
      
      {/* HERO SECTION WITH EXPLODED BACKGROUND & SCROLL-SCRUBBED ROBOT SHOWCASE */}
      <section
        ref={heroSectionRef}
        style={{ '--explode-progress': '0' } as React.CSSProperties}
        className="relative overflow-x-clip px-6 pt-16 pb-16 bg-gradient-to-b from-slate-50 via-white to-white"
      >
        <HeroExplodedBackground />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f4e3b5] border border-[#f4e3b5] text-slate-900 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#3ab0a2]" />
            <span>{t.heroKicker}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] max-w-4xl mx-auto">
            {t.heroTitle}
          </h1>

          {language === 'id' && <IndonesiaFlagMap />}

          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenDemoModal}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#3ab0a2] text-white font-bold text-sm hover:bg-[#329c90] transition-all shadow-xl shadow-[#3ab0a2]/30 flex items-center justify-center gap-2"
            >
              {t.buyNow} <ArrowRight className={`w-4 h-4 ${arrowDir}`} />
            </button>
            <button
              onClick={onOpenWebApp}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              {t.openWebApp} <Play className="w-4 h-4 text-[#3ab0a2] fill-[#3ab0a2]" />
            </button>
          </div>

          {/* Sticky Scroll Runway — Robot video scrubs frame-by-frame ONLY when mouse scrolls */}
          <div
            ref={robotRunwayRef}
            data-testid="robot-scroll-runway"
            className="relative min-h-[220vh] pt-8"
          >
            <div className="sticky top-24 min-h-[calc(100vh-7rem)] flex items-center justify-center">
              <div className="w-full max-w-4xl mx-auto relative flex items-center justify-center py-6">
                
                {/* Outer Exploded Halo Frame */}
                <div
                  aria-hidden="true"
                  className="exploded-layer pointer-events-none absolute inset-x-10 sm:inset-x-32 -inset-y-2 rounded-[2.25rem] border border-dashed border-[#3ab0a2]/35"
                  style={{ '--explode-x': '0px', '--explode-y': '-10px', '--explode-rot': '3deg', '--explode-scale': '0.12' } as React.CSSProperties}
                />

                {/* Exploded Part 1: Top-Left Audio/Voice Module */}
                <div
                  className="exploded-layer hidden md:flex items-center gap-2.5 absolute top-8 left-4 lg:left-10 z-20 bg-white/95 backdrop-blur-md border border-[#3ab0a2]/30 rounded-2xl px-4 py-3 shadow-lg"
                  style={{ '--explode-x': '-95px', '--explode-y': '-55px', '--explode-rot': '-8deg' } as React.CSSProperties}
                >
                  <Zap className="w-4 h-4 text-[#3ab0a2] shrink-0" />
                  <div className="text-start">
                    <div className="text-xs font-bold text-slate-900">
                      {language === 'fa' ? 'موتور صوتی و پاسخ' : language === 'id' ? 'Modul Suara & Respons' : 'Voice & Response Unit'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {language === 'fa' ? 'پاسخ‌گویی زیر ۵ ثانیه' : language === 'id' ? 'Respons di bawah 5 detik' : 'Sub-5s real-time sync'}
                    </div>
                  </div>
                </div>

                {/* Exploded Part 2: Top-Right Neural Vision Module */}
                <div
                  className="exploded-layer hidden md:flex items-center gap-2.5 absolute top-10 right-4 lg:right-10 z-20 bg-white/95 backdrop-blur-md border border-[#f4e3b5] rounded-2xl px-4 py-3 shadow-lg"
                  style={{ '--explode-x': '95px', '--explode-y': '-55px', '--explode-rot': '8deg' } as React.CSSProperties}
                >
                  <Bot className="w-4 h-4 text-[#3ab0a2] shrink-0" />
                  <div className="text-start">
                    <div className="text-xs font-bold text-slate-900">
                      {language === 'fa' ? 'هسته پردازش عصبی' : language === 'id' ? 'Inti Pemrosesan Neural' : 'Neural Reasoning Core'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {language === 'fa' ? 'تصمیم‌گیری هوشمند' : language === 'id' ? 'Pengambilan keputusan' : 'Autonomous task routing'}
                    </div>
                  </div>
                </div>

                {/* Exploded Part 3: Mid-Left Trust & Permissions Shield */}
                <div
                  className="exploded-layer hidden md:flex items-center gap-2.5 absolute top-1/2 -translate-y-1/2 left-0 lg:left-4 z-20 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-4 py-3 shadow-lg"
                  style={{ '--explode-x': '-135px', '--explode-y': '10px', '--explode-rot': '-10deg' } as React.CSSProperties}
                >
                  <ShieldCheck className="w-4 h-4 text-[#3ab0a2] shrink-0" />
                  <div className="text-start">
                    <div className="text-xs font-bold text-slate-900">
                      {language === 'fa' ? 'لایه اعتماد و دسترسی' : language === 'id' ? 'Lapisan Kepercayaan' : '4-Level Trust Guard'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {language === 'fa' ? 'تایید انسانی در عملیات مالی' : language === 'id' ? 'Persetujuan manusia aktif' : 'Human approval enforced'}
                    </div>
                  </div>
                </div>

                {/* Exploded Part 4: Mid-Right Autonomous Schedule Ring */}
                <div
                  className="exploded-layer hidden md:flex items-center gap-2.5 absolute top-1/2 -translate-y-1/2 right-0 lg:right-4 z-20 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-4 py-3 shadow-lg"
                  style={{ '--explode-x': '135px', '--explode-y': '-10px', '--explode-rot': '10deg' } as React.CSSProperties}
                >
                  <RefreshCw className="w-4 h-4 text-[#3ab0a2] shrink-0" />
                  <div className="text-start">
                    <div className="text-xs font-bold text-slate-900">
                      {language === 'fa' ? 'زمان‌بند ۲۴/۷ ابری' : language === 'id' ? 'Penjadwal Otonom 24/7' : '24/7 Execution Scheduler'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {language === 'fa' ? 'همگام با سیستم مدیریت مشتری و فاکتورها' : language === 'id' ? 'Sinkron dengan CRM' : 'Synced across CRM & tasks'}
                    </div>
                  </div>
                </div>

                {/* Exploded Part 5: Core Scroll-Scrubbed Robot Viewport */}
                <div
                  className="exploded-layer relative z-10 w-full flex justify-center"
                  style={{ '--explode-x': '0px', '--explode-y': '-12px', '--explode-rot': '0deg', '--explode-scale': '0.02' } as React.CSSProperties}
                >
                  <ExplodedRobotHero
                    language={language}
                    scrollProgress={robotScrollProgress}
                    onOpenDemoModal={onOpenDemoModal}
                    onOpenWebApp={onOpenWebApp}
                  />
                </div>

                {/* Exploded Part 6: Bottom Chassis Alignment Ring */}
                <div
                  aria-hidden="true"
                  className="exploded-layer pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 w-64 sm:w-80 h-6 rounded-full bg-[#3ab0a2]/15 blur-md"
                  style={{ '--explode-x': '0px', '--explode-y': '60px', '--explode-rot': '0deg', '--explode-scale': '0.25' } as React.CSSProperties}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#3ab0a2]" />
              {language === 'fa' ? 'یک قیمت ثابت برای هر سازمان' : language === 'id' ? 'Satu harga tetap per organisasi' : 'One flat price per organization'}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#3ab0a2]" />
              {language === 'fa' ? 'عوامل هوش مصنوعی و اعضای تیم نامحدود' : language === 'id' ? 'Agen AI & anggota tim tak terbatas' : 'Unlimited AI agents & team members'}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#3ab0a2]" />
              {language === 'fa' ? '۱۴ روز آزمایشی بدون ریسک' : language === 'id' ? 'Uji coba 14 hari bebas risiko' : '14-day risk-free trial'}
            </span>
          </div>

        </div>
      </section>

      {/* OPERATING SYSTEM COMPARISON SECTION */}
      <section className="py-24 px-6 border-t border-slate-200 bg-slate-50/50">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs uppercase font-mono tracking-widest text-[#3ab0a2] font-bold">
              {language === 'fa' ? 'معماری سیستم' : language === 'id' ? 'Arsitektur' : 'Architecture'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {language === 'fa' ? 'سیستم‌عامل برای کسب‌وکار شما' : language === 'id' ? 'Sistem operasi untuk perusahaan Anda' : 'The operating system for your company'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {language === 'fa' ? 'هر بخش از سیستم‌عامل سازمانی دارای معادل مستقیمی در رِو است.' : language === 'id' ? 'Setiap bagian dari sistem operasi perusahaan memiliki padanan langsung di Rev.' : 'Every part of an enterprise operating system has a direct counterpart in Rev.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 shadow-xs rounded-2xl p-6 space-y-3">
              <span className="text-xs font-mono text-[#3ab0a2] font-bold">
                {language === 'fa' ? '۰۱ / ماژول‌ها' : language === 'id' ? '01 / Modul' : '01 / Modules'}
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                {language === 'fa' ? 'فضاهای کاری کسب‌وکار' : language === 'id' ? 'Ruang Kerja Bisnis' : 'Business Workspaces'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'fa' ? 'مشتریان، سرنخ‌ها، معاملات، پروژه‌ها، وظایف، فاکتورها و بازاریابی در یک فضای کاری فوق‌العاده سریع.' : language === 'id' ? 'Pelanggan, prospek, kesepakatan, proyek, tugas, faktur, dan pemasaran dalam satu ruang kerja cepat.' : 'Customers, leads, deals, projects, tasks, invoices, and marketing in one lightning-fast workspace.'}
              </p>
            </div>

            <div className="bg-white border border-slate-200 shadow-xs rounded-2xl p-6 space-y-3">
              <span className="text-xs font-mono text-[#3ab0a2] font-bold">
                {language === 'fa' ? '۰۲ / نیروی کار' : language === 'id' ? '02 / Tenaga Kerja' : '02 / Workforce'}
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                {language === 'fa' ? 'انسان‌ها و کارمندان هوش مصنوعی' : language === 'id' ? 'Manusia & Karyawan AI' : 'People & AI Employees'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'fa' ? 'هر فرد و هر عامل هوش مصنوعی عضو سازمان شما با نقش مشخص و دسترسی‌های دقیق است.' : language === 'id' ? 'Setiap orang dan agen AI adalah anggota organisasi dengan peran dan izin ketat.' : 'Every person and every AI agent is a member of your organization with a distinct role and strict permissions.'}
              </p>
            </div>

            <div className="bg-white border border-slate-200 shadow-xs rounded-2xl p-6 space-y-3">
              <span className="text-xs font-mono text-[#3ab0a2] font-bold">
                {language === 'fa' ? '۰۳ / حاکمیت و نظارت' : language === 'id' ? '03 / Tata Kelola' : '03 / Governance'}
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                {language === 'fa' ? 'چهار سطح اعتماد' : language === 'id' ? 'Empat Tingkat Kepercayaan' : 'Four Trust Levels'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'fa' ? 'مشاهده، پیشنهاد، اقدام با تایید و خودمختار — در هر درخواست عامل بررسی می‌شود.' : language === 'id' ? 'Mengamati, Mengusulkan, Bertindak dengan persetujuan, dan Otonom.' : 'Observe, Propose, Act with approval, and Autonomous — checked on every request an agent makes.'}
              </p>
            </div>

            <div className="bg-white border border-slate-200 shadow-xs rounded-2xl p-6 space-y-3">
              <span className="text-xs font-mono text-[#3ab0a2] font-bold">
                {language === 'fa' ? '۰۴ / اعلان‌ها' : language === 'id' ? '04 / Notifikasi' : '04 / Notifications'}
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                {language === 'fa' ? 'صندوق توجه متمرکز' : language === 'id' ? 'Kotak Masuk Perhatian' : 'Unified Attention Inbox'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'fa' ? 'تاییدیه‌ها، سوالات و ارجاعات عوامل در یک مکان واحد در اپ یا تلگرام قرار می‌گیرد.' : language === 'id' ? 'Persetujuan, pertanyaan, dan eskalasi dari agen mendarat di satu tempat.' : 'Approvals, questions, and escalations from agents land in one centralized place, in the app or on Telegram.'}
              </p>
            </div>

            <div className="bg-white border border-slate-200 shadow-xs rounded-2xl p-6 space-y-3">
              <span className="text-xs font-mono text-[#3ab0a2] font-bold">
                {language === 'fa' ? '۰۵ / زمان‌بند' : language === 'id' ? '05 / Penjadwal' : '05 / Scheduler'}
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                {language === 'fa' ? 'برنامه‌های زمان‌بندی خودکار' : language === 'id' ? 'Jadwal Otonom' : 'Autonomous Schedules'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'fa' ? 'هر عامل بر اساس برنامه خود اجرا می‌شود: گزارش‌های صبحگاهی، مرور هفتگی و بستن ماهانه.' : language === 'id' ? 'Setiap agen berjalan sesuai jadwalnya sendiri.' : 'Each agent runs on its own schedule: morning daily briefs, weekly reviews, and month-end closes.'}
              </p>
            </div>

            <div className="bg-white border border-slate-200 shadow-xs rounded-2xl p-6 space-y-3">
              <span className="text-xs font-mono text-[#3ab0a2] font-bold">
                {language === 'fa' ? '۰۶ / ایمنی' : language === 'id' ? '06 / Keamanan' : '06 / Safety'}
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                {language === 'fa' ? 'کلید توقف اضطراری' : language === 'id' ? 'Tombol Darurat (Kill Switch)' : 'Timelines & Kill Switch'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'fa' ? 'خطوط زمانی اجرا را قدم به قدم بخوانید. یک عامل را مکث کنید یا همه را متوقف کنید.' : language === 'id' ? 'Baca apa yang dilakukan setiap proses langkah demi langkah.' : 'Read what every run did step-by-step. Pause one agent instantly, or stop them all with the global kill switch.'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* WHY NOW & ROI CALCULATOR WITH CHARTS */}
      <section className="py-24 px-6 border-t border-slate-200 bg-white" id="calculator">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs uppercase font-mono tracking-widest text-[#3ab0a2] font-bold">
              {language === 'fa' ? 'بازگشت سرمایه و رشد' : language === 'id' ? 'ROI & Pertumbuhan' : 'ROI & Growth'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {language === 'fa' ? 'رقیب بعدی شما با هوش مصنوعی ساخته می‌شود' : language === 'id' ? 'Kompetitor Anda sedang dibangun dengan AI' : 'Your next competitor is being built AI-native'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {language === 'fa' ? 'کسب‌وکاری که کارهای تکراری را دستی انجام می‌دهد، هر هفته عقب می‌افتد. بیایید شبیه‌ساز سرعت تیم شما را بررسی کنیم.' : language === 'id' ? 'Bisnis yang terus melakukan pekerjaan berulang secara manual akan tertinggal.' : 'A business that keeps doing repeat work by hand loses a little ground every week. Let\'s model your team\'s acceleration.'}
            </p>
          </div>

          {/* Interactive ROI Calculator Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 lg:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4e3b5] text-slate-900 text-xs font-bold">
                <Calculator className="w-3.5 h-3.5 text-[#3ab0a2]" /> 
                {language === 'fa' ? 'شبیه‌ساز تعاملی بازگشت سرمایه' : language === 'id' ? 'Simulator ROI Interaktif' : 'Interactive ROI Simulator'}
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{t.calculatorTitle}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.calculatorSubtitle}
              </p>

              <div className="space-y-5 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">
                      {language === 'fa' ? 'اعضای تیم' : language === 'id' ? 'Anggota tim' : 'Team members'}
                    </span>
                    <span className="text-[#3ab0a2] font-mono text-sm font-bold">{teamSize}</span>
                  </div>
                  <input 
                    type="range" min="1" max="50" value={teamSize} 
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full accent-[#3ab0a2] bg-slate-200 rounded-lg h-2 cursor-pointer" 
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">
                      {language === 'fa' ? 'ساعات کار تکراری هر نفر در هفته' : language === 'id' ? 'Jam kerja berulang per orang per minggu' : 'Weekly repeat work hours per person'}
                    </span>
                    <span className="text-[#3ab0a2] font-mono text-sm font-bold">
                      {repeatHours} {language === 'fa' ? 'ساعت' : language === 'id' ? 'jam' : 'hrs'}
                    </span>
                  </div>
                  <input 
                    type="range" min="4" max="30" value={repeatHours} 
                    onChange={(e) => setRepeatHours(Number(e.target.value))}
                    className="w-full accent-[#3ab0a2] bg-slate-200 rounded-lg h-2 cursor-pointer" 
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">
                      {language === 'fa' ? 'درصد اتوماسیون توسط رِو' : language === 'id' ? 'Persentase otomatisasi oleh Rev' : 'Share of repeat work automated by Rev'}
                    </span>
                    <span className="text-[#3ab0a2] font-mono text-sm font-bold">{aiShare}%</span>
                  </div>
                  <input 
                    type="range" min="10" max="90" value={aiShare} 
                    onChange={(e) => setAiShare(Number(e.target.value))}
                    className="w-full accent-[#3ab0a2] bg-slate-200 rounded-lg h-2 cursor-pointer" 
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
              <span className="text-xs uppercase font-mono tracking-widest text-slate-500 font-bold block">
                {language === 'fa' ? 'تحلیل رشد و شتاب' : language === 'id' ? 'Analisis Pertumbuhan' : 'Compounding Growth Analysis'}
              </span>
              
              <div className="grid grid-cols-2 gap-4 pb-6 border-b border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 font-medium">
                    {language === 'fa' ? 'ساعات واگذار شده به رِو' : language === 'id' ? 'Jam diserahkan ke Rev' : 'Hours handed to Rev'}
                  </span>
                  <div className="text-2xl font-bold font-mono text-[#3ab0a2] mt-1">
                    {hoursPerWeek} <span className="text-sm font-sans">{language === 'fa' ? 'ساعت/هفته' : language === 'id' ? 'jam/mgg' : 'hrs/wk'}</span>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium">
                    {language === 'fa' ? 'معادل نیروی تمام‌وقت' : language === 'id' ? 'Setara karyawan penuh waktu' : 'Capacity gained'}
                  </span>
                  <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
                    {fullTimeEquivalent} <span className="text-sm font-sans">{language === 'fa' ? 'نیروی تمام‌وقت' : 'FTE'}</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-500 font-medium block mb-1">
                  {language === 'fa' ? 'ساعت جلوتر بودن پس از ۲۴ ماه' : language === 'id' ? 'Jam lebih unggul setelah 24 bulan' : 'Hours ahead after 24 months'}
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold font-mono text-slate-900 tracking-tight">
                  {hours24Months.toLocaleString()} <span className="text-lg font-normal text-slate-500 font-sans">{language === 'fa' ? 'ساعت' : language === 'id' ? 'jam' : 'hours'}</span>
                </div>
              </div>

              {/* Visual Bar Chart Indicator */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                  <span>{language === 'fa' ? 'روند کار دستی' : language === 'id' ? 'Alur Kerja Manual' : 'Manual Workflow'}</span>
                  <span className="text-[#3ab0a2]">
                    {language === 'fa'
                      ? `برتری رِو (+${hours24Months.toLocaleString()} ساعت)`
                      : language === 'id'
                      ? `Keunggulan Rev (+${hours24Months.toLocaleString()} jam)`
                      : `Rev Advantage (+${hours24Months.toLocaleString()} hrs)`}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden flex">
                  <div className="bg-slate-300 w-1/4 h-full" />
                  <div className="bg-[#3ab0a2] flex-1 h-full animate-pulse" />
                </div>
              </div>

              <button
                onClick={onOpenDemoModal}
                className="w-full py-4 bg-[#3ab0a2] hover:bg-[#329c90] text-white rounded-xl text-xs font-bold transition-colors shadow-lg shadow-[#3ab0a2]/25"
              >
                {t.startTrial}
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* CUSTOMER-FACING AI AGENTS CATALOGUE */}
      <section className="py-24 px-6 border-t border-slate-200 bg-slate-50/50" id="agents">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs uppercase font-mono tracking-widest text-[#3ab0a2] font-bold">
              {language === 'fa' ? 'عوامل هوش مصنوعی رِو' : language === 'id' ? 'Agen AI Rev' : 'Rev AI Agents'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {language === 'fa' ? 'عواملی که ۲۴ ساعته با مشتریان شما کار می‌کنند' : language === 'id' ? 'Agen yang bekerja dengan pelanggan Anda 24/7' : 'Agents that work with your customers 24/7'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {language === 'fa' ? 'با یک عامل برای فروش، پشتیبانی، رزرو یا تولید سرنخ شروع کنید. شروع با تست ۱۴ روزه رایگان.' : language === 'id' ? 'Mulai dengan satu agen untuk penjualan, dukungan, pemesanan, atau pembuatan prospek.' : 'Start with one agent for sales, support, bookings, or lead generation. Plans start with a 14-day free trial.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-xs hover:border-[#3ab0a2] transition-all">
              <div className="space-y-3">
                <span className="text-[10px] bg-[#f4e3b5] text-slate-900 px-2.5 py-1 rounded font-bold">
                  {language === 'fa' ? 'سرنخ واجد شرایط' : language === 'id' ? 'Prospek Berkualitas' : 'Lead Qualified'}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {language === 'fa' ? 'عامل فروش رِو' : language === 'id' ? 'Agen Penjualan Rev' : 'Rev Sales Agent'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'fa' ? 'سرنخ‌های ورودی را فوراً ارزیابی کرده، با ایمیل و واتساپ پیگیری می‌کند و جلسه رزرو می‌کند.' : language === 'id' ? 'Kualifikasi prospek masuk secara instan, tindak lanjuti via email dan WhatsApp.' : 'Qualifies inbound leads instantly, follows up via email and WhatsApp, and books meetings directly into your calendar.'}
                </p>
              </div>
              <button onClick={onOpenDemoModal} className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5">
                {t.startTrial} <ArrowRight className={`w-3.5 h-3.5 ${arrowDir}`} />
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-xs hover:border-[#3ab0a2] transition-all">
              <div className="space-y-3">
                <span className="text-[10px] bg-[#f4e3b5] text-slate-900 px-2.5 py-1 rounded font-bold">
                  {language === 'fa' ? 'پشتیبانی حل شده' : language === 'id' ? 'Tiket Diselesaikan' : 'Ticket Resolved'}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {language === 'fa' ? 'عامل پشتیبانی رِو' : language === 'id' ? 'Agen Dukungan Rev' : 'Rev Support Agent'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'fa' ? 'به سوالات مشتریان در چت، ایمیل، واتساپ و تلگرام پاسخ داده و در صورت نیاز ارجاع می‌دهد.' : language === 'id' ? 'Menjawab pertanyaan pelanggan di obrolan, email, WhatsApp, dan Telegram.' : 'Answers customer inquiries on chat, email, WhatsApp, and Telegram, escalating with full context when human judgment is needed.'}
                </p>
              </div>
              <button onClick={onOpenDemoModal} className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5">
                {t.startTrial} <ArrowRight className={`w-3.5 h-3.5 ${arrowDir}`} />
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-xs hover:border-[#3ab0a2] transition-all">
              <div className="space-y-3">
                <span className="text-[10px] bg-[#f4e3b5] text-slate-900 px-2.5 py-1 rounded font-bold">
                  {language === 'fa' ? 'نوبت رزرو شده' : language === 'id' ? 'Janji Temu Dipesan' : 'Appointment Booked'}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {language === 'fa' ? 'دستیار مجازی رِو' : language === 'id' ? 'Asisten Virtual Rev' : 'Rev Virtual Assistant'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'fa' ? 'یک پذیرش ۲۴ ساعته که قرار ملاقات‌ها را در وقت‌های آزاد شما ثبت کرده و یادآوری می‌فرستد.' : language === 'id' ? 'Resepsionis 24/7 yang memesan janji temu di waktu luang Anda.' : 'A 24/7 front desk that books appointments during your free times, handles rescheduling, and sends automated reminders.'}
                </p>
              </div>
              <button onClick={onOpenDemoModal} className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5">
                {t.startTrial} <ArrowRight className={`w-3.5 h-3.5 ${arrowDir}`} />
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-xs hover:border-[#3ab0a2] transition-all">
              <div className="space-y-3">
                <span className="text-[10px] bg-[#f4e3b5] text-slate-900 px-2.5 py-1 rounded font-bold">
                  {language === 'fa' ? 'نیازمند تایید' : language === 'id' ? 'Membutuhkan Persetujuan' : 'Approval Required'}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {language === 'fa' ? 'عامل اپراتور رِو' : language === 'id' ? 'Agen Operator Rev' : 'Rev Operator Agent'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'fa' ? 'همکار هوش مصنوعی برای کارهای تکراری اداری و ورود اطلاعات. تیم شما هر ارسال را تایید می‌کند.' : language === 'id' ? 'Rekan kerja AI untuk pekerjaan administratif berulang.' : 'An AI coworker for repetitive back-office work, data entry, and report compilation. Your team approves every outgoing send.'}
                </p>
              </div>
              <button onClick={onOpenDemoModal} className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5">
                {t.startTrial} <ArrowRight className={`w-3.5 h-3.5 ${arrowDir}`} />
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-xs hover:border-[#3ab0a2] transition-all">
              <div className="space-y-3">
                <span className="text-[10px] bg-[#f4e3b5] text-slate-900 px-2.5 py-1 rounded font-bold">
                  {language === 'fa' ? 'سرنخ‌های تایید شده' : language === 'id' ? 'Prospek B2B Terverifikasi' : 'Verified B2B Leads'}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {language === 'fa' ? 'تولیدکننده سرنخ سازمانی' : language === 'id' ? 'Generator Prospek B2B Rev' : 'Rev B2B Lead Generator'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'fa' ? 'وب زنده را هر روز کاری بررسی کرده و تصمیم‌گیرندگان تاییدشده را مستقیم به سیستم مدیریت مشتری می‌آورد.' : language === 'id' ? 'Mencari web langsung setiap hari kerja dan mengirimkan pengambil keputusan.' : 'Researches the live web every business day and delivers verified decision-makers straight to your CRM pipeline.'}
                </p>
              </div>
              <button onClick={onOpenDemoModal} className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5">
                {t.startTrial} <ArrowRight className={`w-3.5 h-3.5 ${arrowDir}`} />
              </button>
            </div>

            <div className="bg-gradient-to-tr from-[#3ab0a2]/10 to-[#f4e3b5]/30 border border-[#3ab0a2]/30 rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <span className="text-[10px] bg-[#3ab0a2] text-white px-2.5 py-1 rounded font-bold">
                  {language === 'fa' ? 'سفارشی' : language === 'id' ? 'Kustom' : 'Custom Built'}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {language === 'fa' ? 'راهکارهای سفارشی رِو' : language === 'id' ? 'Solusi Kustom Rev' : 'Custom Rev Solutions'}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {language === 'fa' ? 'نیاز به ساخت سیستم بر اساس روند کاری خاص خود دارید؟ تیم ما عوامل سفارشی را روی سیستم مدیریت مشتری شما پیاده می‌کند.' : language === 'id' ? 'Butuh sistem yang dibuat khusus untuk alur kerja Anda?' : 'Need something built around your specific workflow? Our team designs, builds, and maintains custom agents on your CRM.'}
                </p>
              </div>
              <button onClick={onOpenDemoModal} className="w-full py-2.5 bg-[#3ab0a2] hover:bg-[#329c90] text-white rounded-xl text-xs font-bold transition-colors shadow-lg shadow-[#3ab0a2]/25 flex items-center justify-center gap-1.5">
                {language === 'fa' ? 'درخواست قیمت سفارشی' : language === 'id' ? 'Dapatkan Penawaran Kustom' : 'Get a Custom Quote'} <ArrowRight className={`w-3.5 h-3.5 ${arrowDir}`} />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* PRICING PLANS */}
      <section className="py-24 px-6 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs uppercase font-mono tracking-widest text-[#3ab0a2] font-bold">
              {language === 'fa' ? 'تعرفه‌ها' : language === 'id' ? 'Harga' : 'Pricing'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{t.pricingTitle}</h2>
            <p className="text-slate-600 text-sm sm:text-base">{t.pricingSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div 
                key={plan.id} 
                className={`bg-white border rounded-3xl p-8 flex flex-col justify-between relative shadow-sm ${
                  plan.popular ? 'border-[#3ab0a2] shadow-xl ring-2 ring-[#3ab0a2]/20' : 'border-slate-200'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#3ab0a2] text-white text-[10px] uppercase font-extrabold tracking-wider px-3 py-1 rounded-full shadow-md">
                    {language === 'fa' ? 'محبوب‌ترین' : language === 'id' ? 'Paling Populer' : 'Most Popular'}
                  </span>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                    <p className="text-xs text-slate-600 mt-1">{plan.description}</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                    <span className="text-xs text-slate-500">{plan.period}</span>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-[#3ab0a2] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onNavigateBilling}
                  className={`w-full mt-8 py-3.5 rounded-xl text-xs font-bold transition-all ${
                    plan.popular
                      ? 'bg-[#3ab0a2] text-white shadow-lg shadow-[#3ab0a2]/30 hover:bg-[#329c90]'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {language === 'fa' ? `انتخاب ${plan.name}` : language === 'id' ? `Pilih ${plan.name}` : `Select ${plan.name}`}
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="py-24 px-6 border-t border-slate-200 bg-slate-50/50" id="faq">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest text-[#3ab0a2] font-bold">
              {language === 'fa' ? 'پرسش و پاسخ' : 'FAQ'}
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              {language === 'fa' ? 'سوالات متداول' : language === 'id' ? 'Pertanyaan yang Sering Diajukan' : 'Frequently Asked Questions'}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-start flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-[#3ab0a2]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform shrink-0 ${openFaq === idx ? 'rotate-180 text-[#3ab0a2]' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#3ab0a2] flex items-center justify-center text-white font-black">
                R
              </div>
              <span className="text-base font-bold text-slate-900">Rev Platform</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'fa' ? 'سیستم‌عامل نیروی کار هوش مصنوعی. عوامل کارها را انجام می‌دهند.' : language === 'id' ? 'Sistem operasi tenaga kerja AI.' : 'The autonomous AI employee operating system.'}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {language === 'fa' ? 'پلتفرم' : language === 'id' ? 'Platform' : 'Platform'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button onClick={onOpenWebApp} className="hover:text-slate-900 transition-colors">
                  {language === 'fa' ? 'فضای کاری رِو' : language === 'id' ? 'Ruang Kerja Rev' : 'Rev Workspace'}
                </button>
              </li>
              <li>
                <a href="#agents" className="hover:text-slate-900 transition-colors">
                  {language === 'fa' ? 'فهرست عوامل هوش مصنوعی' : language === 'id' ? 'Katalog Agen AI' : 'AI Agents Catalogue'}
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-slate-900 transition-colors">
                  {language === 'fa' ? 'محاسبه‌گر بازگشت سرمایه' : language === 'id' ? 'Kalkulator ROI' : 'ROI Calculator'}
                </a>
              </li>
              <li>
                <button onClick={onNavigateBilling} className="hover:text-slate-900 transition-colors">
                  {language === 'fa' ? 'تعرفه‌ها و اشتراک‌ها' : language === 'id' ? 'Paket Harga' : 'Pricing Plans'}
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {language === 'fa' ? 'منابع' : language === 'id' ? 'Sumber Daya' : 'Resources'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button onClick={onNavigateBlog} className="hover:text-slate-900 transition-colors">
                  {language === 'fa' ? 'داستان مشتریان و وبلاگ' : language === 'id' ? 'Cerita Pelanggan & Blog' : 'Customer Stories & Blog'}
                </button>
              </li>
              <li>
                <a href="#faq" className="hover:text-slate-900 transition-colors">
                  {language === 'fa' ? 'سوالات متداول و امنیت' : language === 'id' ? 'FAQ & Keamanan' : 'FAQ & Security'}
                </a>
              </li>
              <li>
                <button onClick={onOpenDemoModal} className="hover:text-slate-900 transition-colors">
                  {language === 'fa' ? 'درخواست دمو' : language === 'id' ? 'Minta Demo' : 'Request a Demo'}
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {language === 'fa' ? 'امنیت و اعتماد' : language === 'id' ? 'Keamanan' : 'Security & Trust'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'fa' ? 'ایزوله‌شده به ازای هر سازمان با رمزنگاری سازمانی.' : language === 'id' ? 'Terisolasi per organisasi dengan enkripsi tingkat enterprise.' : 'Isolated per organization with enterprise encryption.'}
            </p>
          </div>

        </div>

        <div className="max-w-6xl mx-auto border-t border-slate-100 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>
            {language === 'fa'
              ? '© ۲۰۲۶ Rev Platform. تمامی حقوق محفوظ است.'
              : '© 2026 Rev Platform Inc. All rights reserved.'}
          </p>
          <div className="flex items-center gap-6 mt-4 sm:mt-0">
            <span>{language === 'fa' ? 'حریم خصوصی' : language === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy'}</span>
            <span>{language === 'fa' ? 'قوانین استفاده' : language === 'id' ? 'Ketentuan Layanan' : 'Terms of Service'}</span>
            <span>{language === 'fa' ? 'مرکز امنیت' : language === 'id' ? 'Pusat Keamanan' : 'Security Center'}</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
