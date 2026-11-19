import React from 'react';
import { Bot, Globe, LayoutDashboard, Sparkles, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/mockData';

interface NavbarProps {
  currentView: 'marketing' | 'webapp' | 'blog' | 'billing';
  setCurrentView: (view: 'marketing' | 'webapp' | 'blog' | 'billing') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenDemoModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  language,
  setLanguage,
  onOpenDemoModal
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <div 
          onClick={() => setCurrentView('marketing')}
          className="flex items-center gap-3 cursor-pointer shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-[#3ab0a2] flex items-center justify-center shadow-lg shadow-[#3ab0a2]/30 text-white font-black text-xl">
            R
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5">
              {t.brandTitle}
            </span>
            <span className="text-[10px] text-slate-500 block tracking-wider uppercase font-medium">
              {t.brandSubtitle}
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button 
            onClick={() => setCurrentView('marketing')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap ${currentView === 'marketing' ? 'text-slate-900 font-bold' : ''}`}
          >
            {t.navPlatform}
          </button>
          <a href="#agents" onClick={() => setCurrentView('marketing')} className="hover:text-slate-900 transition-colors whitespace-nowrap">
            {t.navAgents}
          </a>
          <a href="#calculator" onClick={() => setCurrentView('marketing')} className="hover:text-slate-900 transition-colors whitespace-nowrap">
            {t.navCalculator}
          </a>
          <button 
            onClick={() => setCurrentView('blog')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap ${currentView === 'blog' ? 'text-slate-900 font-bold' : ''}`}
          >
            {t.navBlog}
          </button>
          <button 
            onClick={() => setCurrentView('billing')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap ${currentView === 'billing' ? 'text-slate-900 font-bold' : ''}`}
          >
            {t.navPricing}
          </button>
        </nav>

        {/* Zone 3: Actions & Controls */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Language Selector */}
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-1">
            <Globe className="w-3.5 h-3.5 text-slate-500 ms-1.5 hidden sm:block" />
            <select
              aria-label={language === 'fa' ? 'انتخاب زبان' : 'Select language'}
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-xs font-semibold text-slate-700 px-2 py-1 outline-none cursor-pointer"
            >
              <option value="en">EN</option>
              <option value="fa">فارسی</option>
              <option value="id">ID</option>
            </select>
          </div>

          {/* WebApp Mode Toggle */}
          <button
            onClick={() => setCurrentView(currentView === 'webapp' ? 'marketing' : 'webapp')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all ${
              currentView === 'webapp'
                ? 'bg-slate-900 text-white shadow-lg'
                : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-[#3ab0a2]" />
            <span className="hidden sm:inline">{currentView === 'webapp' ? t.backToWebsite : t.openWebApp}</span>
          </button>

          {/* Primary Action / Buy Now */}
          <button
            onClick={onOpenDemoModal}
            className="px-4 py-2 text-xs font-bold text-white bg-[#3ab0a2] hover:bg-[#329c90] rounded-xl transition-all shadow-lg shadow-[#3ab0a2]/25 whitespace-nowrap"
          >
            {t.buyNow}
          </button>
        </div>

      </div>
    </header>
  );
};
