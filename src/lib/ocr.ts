export interface ParsedAadhaar {
  fullName?: string;
  aadhaarNumber?: string;
  dob?: string;
  gender?: string;
  address?: string;
  pincode?: string;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function runOCR(file: File): Promise<ParsedAadhaar> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("API key not configured");

  const base64 = await fileToBase64(file);
  const mimeType = file.type || "image/jpeg";

  const prompt = `You are Aadhaar OCR. Extract from this Aadhaar card image and return ONLY valid JSON:
{
  "fullName": "name as on card",
  "aadhaarNumber": "12 digit number without spaces",
  "dob": "DD/MM/YYYY",
  "gender": "MALE/FEMALE",
  "address": "full address",
  "pincode": "6 digit"
}
If field not visible, skip it. Return JSON only, no markdown.`;

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: mimeType, data: base64 } }] }],
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("Gemini error:", err);
    throw new Error("Could not read the card clearly");
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(jsonMatch? jsonMatch[0] : text);
    return parsed;
  } catch {
    throw new Error("Could not read the card clearly");
  }
}
