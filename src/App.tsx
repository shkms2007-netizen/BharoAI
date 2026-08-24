import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import UploadCard from '@/components/UploadCard';
import ChatBox from '@/components/ChatBox';
import Features from '@/components/Features';
import Stats from '@/components/Stats';
import Footer from '@/components/Footer';
import type { Language, UploadedFile } from '@/types';

type AadhaarData = {
  name: string;
  dob: string;
  address: string;
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [uploaded, setUploaded] = useState<{ file: UploadedFile; data: AadhaarData } | null>(null);

  // Persist language preference
  useEffect(() => {
    const saved = localStorage.getItem('bharoai-lang') as Language | null;
    if (saved && ['en', 'hi', 'mr'].includes(saved)) {
      setLang(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bharoai-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  function handleUpload(file: UploadedFile, data: AadhaarData) {
    setUploaded({ file, data });
  }

  function handleRemove() {
    setUploaded(null);
  }

  function scrollToUpload() {
    document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header lang={lang} setLang={setLang} />

      <main className="flex-1">
        <Hero lang={lang} onStart={scrollToUpload} />

        {/* Upload + Chat section */}
        <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-saffron-50/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
              <UploadCard
                lang={lang}
                onUpload={handleUpload}
                uploaded={uploaded}
                onRemove={handleRemove}
              />
              <ChatBox
                lang={lang}
                hasAadhaar={!!uploaded}
                aadhaarData={uploaded?.data ?? null}
              />
            </div>
          </div>
        </section>

        <Features lang={lang} />
        <Stats lang={lang} />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
