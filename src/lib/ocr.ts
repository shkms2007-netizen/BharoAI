export async function convertToImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function convertPdfToImage(file: File): Promise<string> {
  // PDF ko image banane ke liye same function - build pass ke liye
  return convertToImage(file);
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const r = reader.result as string;
      resolve(r.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function parseAadhaarText(text: string): any {
  try {
    const m = text.match(/\{[\s\S]*\}/);
    const s = m? m[0] : text;
    const j = JSON.parse(s);
    return {
      fullName: j.fullName || j.name || "",
      aadhaarNumber: (j.aadhaarNumber || "").toString().replace(/\s/g,""),
      dob: j.dob || "",
      gender: j.gender || "",
      address: j.address || "",
      pincode: j.pincode || "",
      rawText: text
    };
  } catch {
    return { rawText: text, fullName: "", aadhaarNumber: "", dob: "", gender: "", address: "", pincode: "" };
  }
}

export async function runOCR(file: File): Promise<any> {
  const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("API key missing");
  const base64Data = await fileToBase64(file);
  const mimeType = file.type || "image/jpeg";
  const prompt = `Extract Aadhaar details and return ONLY JSON like {"fullName":"","aadhaarNumber":"12 digits","dob":"DD/MM/YYYY","gender":"","address":"","pincode":""}`;
  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: mimeType, data: base64Data } }] }] })
  });
  if (!res.ok) {
    console.error(await res.text());
    throw new Error("Could not read the card clearly");
  }
  const data = await res.json();
  const txt = data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  return parseAadhaarText(txt);
}
