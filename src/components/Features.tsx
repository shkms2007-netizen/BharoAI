import { UploadCloud, MessageSquareText, FileCheck2 } from 'lucide-react';
import type { Language } from '@/types';
import { tr } from '@/i18n';

type FeaturesProps = { lang: Language };

export default function Features({ lang }: FeaturesProps) {
  const features = [
    { icon: UploadCloud, titleKey: 'feature1Title' as const, descKey: 'feature1Desc' as const, step: '1' },
    { icon: MessageSquareText, titleKey: 'feature2Title' as const, descKey: 'feature2Desc' as const, step: '2' },
    { icon: FileCheck2, titleKey: 'feature3Title' as const, descKey: 'feature3Desc' as const, step: '3' },
  ];

  return (
    <section id="how" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{tr('featuresTitle', lang)}</h2>
          <p className="mt-3 text-gray-600">{tr('featuresSubtitle', lang)}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.titleKey}
                className="relative group p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white to-saffron-50/40 border border-saffron-100 hover:border-saffron-200 hover:shadow-xl hover:shadow-saffron-500/10 transition-all animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="absolute top-5 right-5 text-5xl font-bold text-saffron-100 select-none group-hover:text-saffron-200 transition-colors">
                  {f.step}
                </div>
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-saffron-500 to-saffron-600 flex items-center justify-center shadow-md mb-5">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="relative text-lg font-bold text-gray-900 mb-2">{tr(f.titleKey, lang)}</h3>
                <p className="relative text-sm text-gray-600 leading-relaxed">{tr(f.descKey, lang)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
