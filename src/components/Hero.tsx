import { ArrowDown, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import type { Language } from '@/types';
import { tr } from '@/i18n';

type HeroProps = {
  lang: Language;
  onStart: () => void;
};

export default function Hero({ lang, onStart }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-br from-saffron-50 via-white to-saffron-50/50 pt-12 pb-16 sm:pt-16 sm:pb-24">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-saffron-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-24 w-80 h-80 bg-saffron-100/40 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-saffron-200 shadow-sm mb-6 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-saffron-500" />
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              {lang === 'hi' ? 'AI-संचालित सरकारी फॉर्म सहायक' : lang === 'mr' ? 'AI-चालित सरकारी फॉर्म सहाय्यक' : 'AI-powered Sarkari form assistant'}
            </span>
          </div>

          {/* Hero heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.15] animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
            <span className="block text-saffron-600">{tr('heroLine1', lang)}</span>
            <span className="block bg-gradient-to-r from-saffron-500 to-saffron-700 bg-clip-text text-transparent">{tr('heroLine2', lang)}</span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {tr('heroSub', lang)}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <button
              onClick={onStart}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-saffron-500 text-white font-semibold text-base shadow-lg shadow-saffron-500/30 hover:bg-saffron-600 hover:shadow-xl hover:shadow-saffron-500/40 active:scale-[0.98] transition-all"
            >
              {tr('heroCta', lang)}
              <ArrowDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            </button>
            <span className="text-sm text-gray-500 font-medium">{tr('heroSubCta', lang)}</span>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <ShieldCheck className="w-4 h-4 text-ashok-500" />
              <span className="font-medium">{tr('trustSecure', lang)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <ShieldCheck className="w-4 h-4 text-ashok-500" />
              <span className="font-medium">{tr('trustPrivate', lang)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Zap className="w-4 h-4 text-saffron-500" />
              <span className="font-medium">{tr('trustFree', lang)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
