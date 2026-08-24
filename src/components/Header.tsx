import { useState } from 'react';
import { FileText, Globe, Menu, X } from 'lucide-react';
import type { Language } from '@/types';
import { languages, tr } from '@/i18n';

type HeaderProps = {
  lang: Language;
  setLang: (l: Language) => void;
};

export default function Header({ lang, setLang }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-saffron-100 shadow-sm">
      <div className="h-1 tricolor-bar" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron-500 to-saffron-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <FileText className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-bold text-gray-900">{tr('appName', lang)}</span>
              <span className="text-[10px] text-saffron-600 font-medium hidden sm:block">{tr('tagline', lang)}</span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            <a href="#how" className="text-sm font-medium text-gray-600 hover:text-saffron-600 transition-colors">{tr('navHowItWorks', lang)}</a>
            <a href="#forms" className="text-sm font-medium text-gray-600 hover:text-saffron-600 transition-colors">{tr('navForms', lang)}</a>
            <a href="#contact" className="text-sm font-medium text-gray-600 hover:text-saffron-600 transition-colors">{tr('navContact', lang)}</a>
          </nav>

          {/* Language toggle + mobile menu button */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-saffron-50 rounded-full p-1 border border-saffron-100">
              <Globe className="w-4 h-4 text-saffron-500 ml-2 mr-1" />
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    lang === l.code
                      ? 'bg-saffron-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-saffron-600'
                  }`}
                >
                  {l.native}
                </button>
              ))}
            </div>

            {/* Mobile language selector (compact) */}
            <div className="flex sm:hidden items-center bg-saffron-50 rounded-full p-1 border border-saffron-100">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                    lang === l.code ? 'bg-saffron-500 text-white' : 'text-gray-600'
                  }`}
                >
                  {l.short}
                </button>
              ))}
            </div>

            <button
              className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-1 animate-fade-in">
            <a href="#how" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-saffron-50 hover:text-saffron-600 transition-colors">{tr('navHowItWorks', lang)}</a>
            <a href="#forms" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-saffron-50 hover:text-saffron-600 transition-colors">{tr('navForms', lang)}</a>
            <a href="#contact" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-saffron-50 hover:text-saffron-600 transition-colors">{tr('navContact', lang)}</a>
          </nav>
        )}
      </div>
    </header>
  );
}
