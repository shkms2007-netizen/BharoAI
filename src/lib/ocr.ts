import Tesseract from 'tesseract.js';
import type { AadhaarData } from '@/types';

/**
 * Run OCR on an image file using tesseract.js.
 * Returns the raw extracted text.
 */
export async function runOCR(
  file: File | Blob,
  onProgress?: (pct: number) => void,
): Promise<string> {
  const result = await Tesseract.recognize(file, 'eng', {
    logger: (m) => {
      if (m.status === 'recognizing text' && onProgress) {
        onProgress(m.progress);
      }
    },
  });
  return result.data.text;
}

/**
 * Parse raw OCR text from an Aadhaar card to extract structured data.
 * Aadhaar cards typically contain:
 * - Name (often after "Name:" or on its own line)
 * - Date of birth (DD/MM/YYYY or "DOB:" format)
 * - Gender (MALE/FEMALE/Other)
 * - Aadhaar number (12 digits, often spaced as XXXX XXXX XXXX)
 * - Address (multi-line, after "Address:" keyword)
 */
export function parseAadhaarText(rawText: string): AadhaarData {
  const lines = rawText
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const fullText = rawText.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();

  // Extract Aadhaar number (12 digits, optionally spaced)
  let aadhaarNumber = '';
  const aadhaarMatch = fullText.match(/\b(\d{4}\s?\d{4}\s?\d{4})\b/);
  if (aadhaarMatch) {
    aadhaarNumber = aadhaarMatch[1].replace(/\s/g, ' ').trim();
  }

  // Extract DOB
  let dob = '';
  const dobPatterns = [
    /DOB[:\s]+(\d{2}[\/\-]\d{2}[\/\-]\d{4})/i,
    /Date\s*of\s*Birth[:\s]+(\d{2}[\/\-]\d{2}[\/\-]\d{4})/i,
    /\b(\d{2}[\/\-]\d{2}[\/\-]\d{4})\b/,
    /DOB[:\s]+(\d{2}\s+\w+\s+\d{4})/i,
  ];
  for (const pattern of dobPatterns) {
    const match = fullText.match(pattern);
    if (match) {
      dob = match[1];
      break;
    }
  }

  // Extract gender
  let gender = '';
  const genderMatch = fullText.match(/\b(MALE|FEMALE|OTHER|पुरुष|स्त्री|महिला)\b/i);
  if (genderMatch) {
    const g = genderMatch[1].toLowerCase();
    if (g === 'male' || g === 'पुरुष') gender = 'Male';
    else if (g === 'female' || g === 'स्त्री' || g === 'महिला') gender = 'Female';
    else gender = 'Other';
  }

  // Extract name
  let name = '';
  const namePatterns = [
    /(?:Name|नाम)[:\s]+([A-Za-z\s]+)/i,
  ];
  for (const pattern of namePatterns) {
    const match = fullText.match(pattern);
    if (match) {
      name = match[1].trim().substring(0, 60);
      break;
    }
  }
  // Fallback: look for a line that looks like a name (no digits, not a keyword)
  if (!name) {
    const keywords = ['address', 'aadhaar', 'government', 'india', 'भारत', 'सरकार', 'dob', 'male', 'female', 'year', 'date'];
    for (const line of lines) {
      const lower = line.toLowerCase();
      if (
        line.length > 3 &&
        line.length < 50 &&
        !/\d/.test(line) &&
        !keywords.some((k) => lower.includes(k)) &&
        /^[A-Za-z\s]+$/.test(line) &&
        line.split(' ').length >= 2
      ) {
        name = line.trim();
        break;
      }
    }
  }

  // Extract address
  let address = '';
  const addressMatch = rawText.match(/Address[:\s]*\n?([\s\S]*?)(?:\d{4}\s?\d{4}\s?\d{4}|$)/i);
  if (addressMatch) {
    address = addressMatch[1]
      .replace(/\n/g, ', ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/^,|,$/g, '');
  }
  // Fallback: grab lines after "Address" keyword
  if (!address) {
    const addrIdx = lines.findIndex((l) => /address/i.test(l));
    if (addrIdx >= 0 && addrIdx + 1 < lines.length) {
      const addrLines = lines.slice(addrIdx + 1).filter((l) => !/\d{4}\s?\d{4}\s?\d{4}/.test(l));
      address = addrLines.join(', ');
    }
  }
  if (!address) {
    // Last resort: take the last few non-name, non-keyword lines
    const addrLines = lines.filter((l) => {
      const lower = l.toLowerCase();
      return (
        l.length > 5 &&
        l !== name &&
        !lower.includes('government') &&
        !lower.includes('aadhaar') &&
        !/\d{4}\s?\d{4}\s?\d{4}/.test(l)
      );
    });
    if (addrLines.length > 0) {
      address = addrLines.slice(-3).join(', ');
    }
  }

  return {
    name: name || 'Not detected',
    dob: dob || 'Not detected',
    gender: gender || 'Not detected',
    aadhaarNumber: aadhaarNumber || 'Not detected',
    address: address || 'Not detected',
  };
}

/**
 * Convert a PDF file to an image (first page) using a canvas.
 * This is needed because tesseract.js works on images, not PDFs.
 * Uses pdf.js loaded dynamically.
 */
type PdfjsLib = {
  getDocument: (params: { data: ArrayBuffer }) => { promise: Promise<PdfDocument> };
  GlobalWorkerOptions: { workerSrc: string };
};

type PdfDocument = {
  getPage: (n: number) => Promise<PdfPage>;
};

type PdfPage = {
  getViewport: (opts: { scale: number }) => { width: number; height: number };
  render: (opts: { canvasContext: CanvasRenderingContext2D; viewport: unknown }) => { promise: Promise<void> };
};

export async function convertPdfToImage(file: File): Promise<Blob> {
  const pdfjsLib = (await import('pdfjs-dist/build/pdf.mjs')) as unknown as PdfjsLib;
  pdfjsLib.GlobalWorkerOptions.workerSrc = (await import('pdfjs-dist/build/pdf.worker.mjs?url')).default as string;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const page = await pdf.getPage(1);

  const viewport = page.getViewport({ scale: 2 });
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas not supported');

  canvas.width = viewport.width;
  canvas.height = viewport.height;
  await page.render({ canvasContext: context, viewport }).promise;

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob as Blob);
    }, 'image/png');
  });
}
