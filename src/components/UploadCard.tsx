import { useRef, useState } from 'react';
import { UploadCloud, FileCheck2, X, ScanLine, User, Calendar, MapPin } from 'lucide-react';
import type { Language, UploadedFile } from '@/types';
import { tr } from '@/i18n';

type AadhaarData = {
  name: string;
  dob: string;
  address: string;
};

type UploadCardProps = {
  lang: Language;
  onUpload: (file: UploadedFile, data: AadhaarData) => void;
  uploaded: { file: UploadedFile; data: AadhaarData } | null;
  onRemove: () => void;
};

const MAX_SIZE = 10 * 1024 * 1024;
const ACCEPTED = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

// Mock extracted Aadhaar data
const mockAadhaar: Record<Language, AadhaarData> = {
  en: { name: 'Ramesh Kumar Sharma', dob: '15-Aug-1990', address: '42 Gandhi Nagar, Lucknow, Uttar Pradesh - 226001' },
  hi: { name: 'रमेश कुमार शर्मा', dob: '15-अगस्त-1990', address: '42 गांधी नगर, लखनऊ, उत्तर प्रदेश - 226001' },
  mr: { name: 'रमेश कुमार शर्मा', dob: '15-ऑगस्ट-1990', address: '42 गांधी नगर, लखनौ, उत्तर प्रदेश - 226001' },
};

export default function UploadCard({ lang, onUpload, uploaded, onRemove }: UploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);

  function validate(file: File): string | null {
    if (!ACCEPTED.includes(file.type) && !file.name.match(/\.(pdf|jpe?g|png)$/i)) {
      return tr('uploadErrorType', lang);
    }
    if (file.size > MAX_SIZE) {
      return tr('uploadErrorSize', lang);
    }
    return null;
  }

  function handleFile(file: File) {
    const err = validate(file);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setScanning(true);

    // Simulate OCR scan delay
    setTimeout(() => {
      const data = mockAadhaar[lang];
      onUpload(
        { name: file.name, size: file.size, type: file.type || 'application/octet-stream' },
        data,
      );
      setScanning(false);
    }, 1800);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  if (uploaded && !scanning) {
    return (
      <div id="upload" className="bg-white rounded-2xl border border-saffron-100 shadow-lg shadow-saffron-500/5 p-5 sm:p-6 animate-fade-in-up">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-ashok-500/10 flex items-center justify-center">
              <FileCheck2 className="w-6 h-6 text-ashok-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">{tr('uploaded', lang)}</h3>
              <p className="text-xs text-gray-500">{tr('uploadedMsg', lang)}</p>
            </div>
          </div>
          <button
            onClick={onRemove}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            aria-label={tr('uploadRemove', lang)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* File info */}
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg mb-4">
          <FileCheck2 className="w-4 h-4 text-saffron-500 shrink-0" />
          <span className="text-sm text-gray-700 truncate">{uploaded.file.name}</span>
          <span className="text-xs text-gray-400 ml-auto shrink-0">{formatSize(uploaded.file.size)}</span>
        </div>

        {/* Extracted fields */}
        <div className="space-y-3">
          <ExtractedRow icon={<User className="w-4 h-4" />} label={tr('uploadedName', lang)} value={uploaded.data.name} />
          <ExtractedRow icon={<Calendar className="w-4 h-4" />} label={tr('uploadedDob', lang)} value={uploaded.data.dob} />
          <ExtractedRow icon={<MapPin className="w-4 h-4" />} label={tr('uploadedAddress', lang)} value={uploaded.data.address} />
        </div>
      </div>
    );
  }

  return (
    <div id="upload" className="bg-white rounded-2xl border border-saffron-100 shadow-lg shadow-saffron-500/5 p-5 sm:p-6 animate-fade-in-up">
      <div className="mb-4">
        <h3 className="text-base font-bold text-gray-900">{tr('uploadTitle', lang)}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{tr('uploadSubtitle', lang)}</p>
      </div>

      {scanning ? (
        <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-saffron-100" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-saffron-500 animate-spin" />
            <ScanLine className="w-7 h-7 text-saffron-500 absolute inset-0 m-auto animate-pulse-slow" />
          </div>
          <p className="text-sm font-medium text-gray-600">{tr('uploadScanning', lang)}</p>
        </div>
      ) : (
        <>
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`cursor-pointer rounded-xl border-2 border-dashed transition-all p-6 sm:p-8 text-center ${
              dragging
                ? 'border-saffron-500 bg-saffron-50 scale-[1.01]'
                : 'border-saffron-200 bg-saffron-50/30 hover:border-saffron-400 hover:bg-saffron-50/60'
            }`}
          >
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-saffron-400 to-saffron-600 flex items-center justify-center shadow-md mb-3">
              <UploadCloud className="w-7 h-7 text-white" />
            </div>
            <button className="text-sm font-semibold text-saffron-600 hover:text-saffron-700 transition-colors">
              {tr('uploadButton', lang)}
            </button>
            <p className="text-xs text-gray-500 mt-2">{tr('uploadOr', lang)}</p>
            <p className="text-[11px] text-gray-400 mt-3">{tr('uploadHint', lang)}</p>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleInputChange}
            className="hidden"
          />

          {error && (
            <div className="mt-3 px-3 py-2 rounded-lg bg-red-50 border border-red-100 animate-fade-in">
              <p className="text-xs text-red-600 font-medium">{error}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ExtractedRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 px-3 py-2.5 rounded-lg bg-gradient-to-r from-saffron-50/60 to-transparent border border-saffron-100/60">
      <div className="w-8 h-8 rounded-lg bg-saffron-500/10 flex items-center justify-center text-saffron-600 shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] text-gray-500 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-sm text-gray-800 font-medium break-words">{value}</p>
      </div>
    </div>
  );
}
