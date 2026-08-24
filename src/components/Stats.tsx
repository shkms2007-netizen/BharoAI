import { FileText, Globe, Users, Target } from 'lucide-react';
import type { Language } from '@/types';
import { tr } from '@/i18n';

type StatsProps = { lang: Language };

export default function Stats({ lang }: StatsProps) {
  const stats = [
    { icon: FileText, value: '50+', key: 'statForms' as const },
    { icon: Globe, value: '3', key: 'statLanguages' as const },
    { icon: Users, value: '10K+', key: 'statUsers' as const },
    { icon: Target, value: '99.2%', key: 'statAccuracy' as const },
  ];

  return (
    <section id="forms" className="py-14 bg-gradient-to-r from-saffron-500 to-saffron-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.key}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-white">{s.value}</div>
                <div className="text-sm text-saffron-100 mt-1 font-medium">{tr(s.key, lang)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
