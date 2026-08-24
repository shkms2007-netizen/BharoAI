function fileToBase64(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const r = reader.result as string;
      resolve(r.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file as File);
  });
}

export async function convertPdfToImage(file: File): Promise<File> {
  // Simple - PDF ko as-is bhejenge, Gemini PDF bhi padh leta hai
  // Agar tujhe first page render chahiye toh baad me pdf.js add karenge
  return file;
}

export function parseAadhaarText(text: string): any {
  try {
    const m = text.match(/\{[\s\S]*\}/);
    const s = m? m[0] : text;
    const j = JSON.parse(s);
    return {
      name: j.fullName || j.name || "Not detected",
      fullName: j.fullName || j.name || "Not detected",
      aadhaarNumber: (j.aadhaarNumber || j.aadhaarNo || "").toString().replace(/\s/g,"") || "Not detected",
      dob: j.dob || "Not detected",
      gender: j.gender || "Not detected",
      address: j.address || "Not detected",
      pincode: j.pincode || "Not detected",
      rawText: text
    };
  } catch {
    return { name: "Not detected", fullName: "Not detected", aadhaarNumber: "Not detected", dob: "Not detected", gender: "Not detected", address: "Not detected", pincode: "Not detected", rawText: text };
  }
}

export async function runOCR(file: File | Blob, onProgress?: (p: number) => void): Promise<string> {
  const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("VITE_GEMINI_API_KEY missing in Netlify env vars");

  if (onProgress) onProgress(0.2);

  const base64Data = await fileToBase64(file);
  const mimeType = (file as File).type || "image/jpeg";

  const prompt = `Extract Aadhaar details from this image. Return ONLY valid JSON like {"fullName":"","aadhaarNumber":"12 digits without spaces","dob":"DD/MM/YYYY","gender":"","address":"","pincode":""}. No extra text.`;

  if (onProgress) onProgress(0.5);

  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: mimeType, data: base64Data } }] }]
    })
  });

  if (onProgress) onProgress(0.8);

  if (!res.ok) {
    const errText = await res.text();
    console.error("Gemini Error:", errText);
    throw new Error(errText.slice(0, 400));
  }
  const data = await res.json();
  const txt = data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

  if (onProgress) onProgress(1);
  return txt;
}

export async function convertToImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
