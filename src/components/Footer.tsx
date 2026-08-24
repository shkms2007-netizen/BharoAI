import { FileText, ShieldCheck, Lock } from 'lucide-react';
import type { Language } from '@/types';
import { tr } from '@/i18n';

type FooterProps = { lang: Language };

export default function Footer({ lang }: FooterProps) {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron-500 to-saffron-600 flex items-center justify-center shadow-md">
                <FileText className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-white">{tr('appName', lang)}</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">{tr('footerTagline', lang)}</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <Lock className="w-4 h-4 text-ashok-500" />
              <span>{tr('footerSecure', lang)}</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">{tr('footerProduct', lang)}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#how" className="text-gray-400 hover:text-saffron-400 transition-colors">{tr('navHowItWorks', lang)}</a></li>
              <li><a href="#forms" className="text-gray-400 hover:text-saffron-400 transition-colors">{tr('navForms', lang)}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">{tr('footerSupport', lang)}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-saffron-400 transition-colors">{tr('footerPrivacy', lang)}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-saffron-400 transition-colors">{tr('footerTerms', lang)}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} {tr('appName', lang)}. {tr('footerRights', lang)}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <ShieldCheck className="w-4 h-4 text-ashok-500" />
            <span>ISO 27001 {lang === 'hi' ? 'प्रमाणित' : lang === 'mr' ? 'प्रमाणित' : 'Certified'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
