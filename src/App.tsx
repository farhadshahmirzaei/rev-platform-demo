import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MarketingWebsite } from './components/MarketingWebsite';
import { RevWebApp } from './components/RevWebApp';
import { BlogSection } from './components/BlogSection';
import { BillingDashboard } from './components/BillingDashboard';
import { DemoModal } from './components/DemoModal';
import { Language } from './types';

function getInitialLanguage(): Language {
  try {
    const params = new URLSearchParams(window.location.search);
    const paramLang = params.get('lang');
    if (paramLang === 'fa' || paramLang === 'en' || paramLang === 'id') {
      return paramLang;
    }
    const saved = window.localStorage.getItem('rev_platform_lang');
    if (saved === 'fa' || saved === 'en' || saved === 'id') {
      return saved;
    }
  } catch {
    // Ignore storage access restrictions inside sandboxed iframes
  }
  return 'en';
}

export default function App() {
  const [currentView, setCurrentView] = useState<'marketing' | 'webapp' | 'blog' | 'billing'>('marketing');
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    const dir = language === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem('rev_platform_lang', language);
    } catch {
      // Ignore storage access restrictions
    }
  }, [language]);

  return (
    <div
      dir={language === 'fa' ? 'rtl' : 'ltr'}
      className="min-h-screen bg-white text-slate-900 flex flex-col font-sans antialiased selection:bg-[#3ab0a2] selection:text-white"
    >
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        language={language}
        setLanguage={setLanguage}
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
      />

      {/* Main View Switcher — language stays synced across Website & Web App */}
      <main className="flex-1 flex flex-col">
        {currentView === 'marketing' && (
          <MarketingWebsite
            language={language}
            onOpenDemoModal={() => setIsDemoModalOpen(true)}
            onOpenWebApp={() => setCurrentView('webapp')}
            onNavigateBlog={() => setCurrentView('blog')}
            onNavigateBilling={() => setCurrentView('billing')}
          />
        )}

        {currentView === 'webapp' && (
          <RevWebApp language={language} />
        )}

        {currentView === 'blog' && (
          <BlogSection
            language={language}
            onBackToMarketing={() => setCurrentView('marketing')}
          />
        )}

        {currentView === 'billing' && (
          <BillingDashboard
            language={language}
            onBackToMarketing={() => setCurrentView('marketing')}
          />
        )}
      </main>

      {/* Demo Modal */}
      <DemoModal
        language={language}
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onOpenWebApp={() => setCurrentView('webapp')}
      />
    </div>
  );
}
