import { Download, Printer, RotateCcw, FileText, CheckCircle2 } from 'lucide-react';
import type { FilledFormData, Language } from '@/types';
import { tr } from '@/i18n';
import { getFormById } from '@/lib/forms';
import { generateFormPDF } from '@/lib/pdf';

type FormPreviewProps = {
  formData: FilledFormData;
  lang: Language;
  onNewForm: () => void;
};

export default function FormPreview({ formData, lang, onNewForm }: FormPreviewProps) {
  const form = getFormById(formData.formId);

  if (!form) return null;

  function handleDownload() {
    if (!form) return;
    generateFormPDF(form, formData, lang);
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="bg-white rounded-2xl border border-saffron-100 shadow-lg shadow-saffron-500/5 p-5 sm:p-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-start gap-3 mb-5">
        <div className="w-11 h-11 rounded-xl bg-ashok-500/10 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-6 h-6 text-ashok-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold text-gray-900">{tr('previewTitle', lang)}</h3>
          <p className="text-xs text-gray-500">{tr('previewFormComplete', lang)}</p>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-saffron-50 border border-saffron-200 text-[11px] font-semibold text-saffron-600 shrink-0">
          {form.name[lang]}
        </div>
      </div>

      {/* Form preview table */}
      <div className="rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-saffron-500 to-saffron-600 px-4 py-3">
          <div className="flex items-center gap-2 text-white">
            <FileText className="w-5 h-5" />
            <span className="font-bold text-sm">{form.name[lang]}</span>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {form.fields.map((field, i) => {
            const value = formData.values[field.key] || '-';
            const isAutoFilled = field.aadhaarMapped && value !== '-';
            return (
              <div
                key={field.key}
                className={`flex items-start gap-3 px-4 py-3 ${i % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-medium text-gray-500">{field.label[lang]}</p>
                    {isAutoFilled && (
                      <span className="text-[9px] font-bold uppercase tracking-wide text-ashok-600 bg-ashok-500/10 px-1.5 py-0.5 rounded">
                        Aadhaar
                      </span>
                    )}
                    {field.required && (
                      <span className="text-red-400 text-[10px]">*</span>
                    )}
                  </div>
                  <p className={`text-sm font-medium mt-0.5 break-words ${value === '-' ? 'text-gray-400 italic' : 'text-gray-800'}`}>
                    {value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ashok-500 text-white text-sm font-semibold shadow-md hover:bg-ashok-600 active:scale-95 transition-all"
        >
          <Download className="w-4 h-4" />
          {tr('previewDownload', lang)}
        </button>
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 active:scale-95 transition-all"
        >
          <Printer className="w-4 h-4" />
          {tr('previewPrint', lang)}
        </button>
        <button
          onClick={onNewForm}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-saffron-200 text-saffron-600 text-sm font-semibold hover:bg-saffron-50 active:scale-95 transition-all ml-auto"
        >
          <RotateCcw className="w-4 h-4" />
          {tr('previewNewForm', lang)}
        </button>
      </div>
    </div>
  );
}
