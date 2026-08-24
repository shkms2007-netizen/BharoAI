import { AadhaarData } from '../types';

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const res = reader.result as string;
      resolve(res.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function convertToImage(file: File): Promise<string> {
  const base = await fileToBase64(file);
  return `data:${file.type};base64,${base}`;
}

export function parseAadhaarText(text: string): AadhaarData {
  const data: any = {};
  try {
    const m = text.match(/\{[\s\S]*\}/);
    const j = JSON.parse(m? m[0] : text);
    return {
      fullName: j.fullName || j.name || "",
      aadhaarNumber: (j.aadhaarNumber || j.aadhaar || "").replace(/\s/g,""),
      dob: j.dob || j.dateOfBirth || "",
      gender: j.gender || "",
      address: j.address || "",
      pincode: j.pincode || "",
      rawText: text
    };
  } catch {
    return { rawText: text } as any;
  }
}

export async function runOCR(file: File): Promise<AadhaarData> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("API key missing");

  const base64Data = await fileToBase64(file);
  const mimeType = file.type || "image/jpeg";

  const prompt = `Extract Aadhaar card details and return ONLY JSON: {"fullName": "", "aadhaarNumber": "12 digits no space", "dob": "DD/MM/YYYY", "gender": "MALE/FEMALE/OTHER", "address": "", "pincode": ""}. If not visible leave blank. JSON only.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: mimeType, data: base64Data } }] }],
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    console.error(errText);
    throw new Error("Could not read the card clearly");
  }

  const result = await response.json();
  const outText = result?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  return parseAadhaarText(outText);
}
