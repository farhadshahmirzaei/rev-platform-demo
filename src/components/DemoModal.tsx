import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, Bot } from 'lucide-react';
import { Language } from '../types';

interface DemoModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  onOpenWebApp: () => void;
}

const DEMO_COPY = {
  en: {
    closeAria: 'Close modal',
    successTitle: 'Organization Provisioned!',
    successDesc:
      'Welcome to Rev Platform. Your demo workspace has been successfully created with 4 AI employees on shift.',
    launchBtn: 'Launch Rev Workspace Now',
    badge: 'Rev Demo & Free Trial',
    heading: 'Experience Rev Platform',
    subheading:
      'We will set up your organization workspace and guide you through your first AI employee run.',
    fullNameLabel: 'Your Full Name',
    fullNamePlaceholder: 'e.g. Farhad Shah',
    companyLabel: 'Company or Organization Name',
    companyPlaceholder: 'e.g. Navand Digital',
    emailLabel: 'Work Email Address',
    emailPlaceholder: 'farhad@company.com',
    submitBtn: 'Provision My Demo Workspace',
  },
  fa: {
    closeAria: 'بستن پنجره',
    successTitle: 'فضای کاری سازمان شما آماده شد!',
    successDesc:
      'به پلتفرم رِو خوش آمدید. فضای کاری دموی شما با ۴ کارمند هوش مصنوعی آماده به کار با موفقیت ساخته شد.',
    launchBtn: 'ورود به فضای کاری رِو',
    badge: 'دمو و آزمایشی رایگان رِو',
    heading: 'تجربه پلتفرم رِو',
    subheading:
      'فضای کاری سازمان شما را راه‌اندازی می‌کنیم و در اولین اجرای کارمند هوش مصنوعی همراهتان خواهیم بود.',
    fullNameLabel: 'نام و نام خانوادگی',
    fullNamePlaceholder: 'مثلاً فرهاد شاه',
    companyLabel: 'نام شرکت یا سازمان',
    companyPlaceholder: 'مثلاً دیجیتال نوند',
    emailLabel: 'نشانی ایمیل کاری',
    emailPlaceholder: 'name@company.ir',
    submitBtn: 'راه‌اندازی فضای کاری دموی من',
  },
  id: {
    closeAria: 'Tutup dialog',
    successTitle: 'Organisasi Berhasil Disiapkan!',
    successDesc:
      'Selamat datang di Rev Platform. Ruang kerja demo Anda telah dibuat dengan 4 karyawan AI bertugas.',
    launchBtn: 'Buka Ruang Kerja Rev Sekarang',
    badge: 'Demo Rev & Uji Coba Gratis',
    heading: 'Rasakan Rev Platform',
    subheading:
      'Kami akan menyiapkan ruang kerja organisasi Anda dan memandu eksekusi karyawan AI pertama Anda.',
    fullNameLabel: 'Nama Lengkap Anda',
    fullNamePlaceholder: 'mis. Farhad Shah',
    companyLabel: 'Nama Perusahaan atau Organisasi',
    companyPlaceholder: 'mis. Navand Digital',
    emailLabel: 'Alamat Email Kerja',
    emailPlaceholder: 'farhad@perusahaan.com',
    submitBtn: 'Siapkan Ruang Kerja Demo Saya',
  },
};

export const DemoModal: React.FC<DemoModalProps> = ({
  language,
  isOpen,
  onClose,
  onOpenWebApp,
}) => {
  const copy = DEMO_COPY[language];
  const [submitted, setSubmitted] = useState(false);
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-lg w-full space-y-6 relative shadow-2xl">
        <button
          onClick={onClose}
          aria-label={copy.closeAria}
          className="absolute top-6 end-6 text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-[#3ab0a2]/20 text-[#3ab0a2] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{copy.successTitle}</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              {copy.successDesc}
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  onClose();
                  onOpenWebApp();
                }}
                className="w-full py-3.5 bg-[#3ab0a2] hover:bg-[#329c90] text-white rounded-xl text-xs font-bold shadow-lg shadow-[#3ab0a2]/25"
              >
                {copy.launchBtn}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4e3b5] text-slate-900 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#3ab0a2]" /> {copy.badge}
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{copy.heading}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{copy.subheading}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-700 font-semibold">{copy.fullNameLabel}</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={copy.fullNamePlaceholder}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 outline-none focus:border-[#3ab0a2]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-700 font-semibold">{copy.companyLabel}</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder={copy.companyPlaceholder}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 outline-none focus:border-[#3ab0a2]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-700 font-semibold">{copy.emailLabel}</label>
                <input
                  type="email"
                  required
                  dir="ltr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={copy.emailPlaceholder}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 outline-none focus:border-[#3ab0a2]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#3ab0a2] hover:bg-[#329c90] text-white rounded-xl text-xs font-bold shadow-lg shadow-[#3ab0a2]/30 transition-all flex items-center justify-center gap-2"
                >
                  <Bot className="w-4 h-4" /> {copy.submitBtn}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
