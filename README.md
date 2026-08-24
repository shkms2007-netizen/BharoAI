# BharoAI

**Sarkari Form Bolo, AI Bharega.**

An AI-powered trilingual (Hindi / Marathi / English) assistant that helps Indian citizens fill government (Sarkari) forms. Upload your Aadhaar card, tell the AI which form you need in your own language, and download the filled form as a PDF.

## Features

- **Real OCR with Tesseract.js** — Upload an Aadhaar card image or PDF; AI extracts Name, DOB, Gender, Aadhaar Number, and Address automatically.
- **Google Gemini AI integration** — Conversational chatbot that understands Hindi, Marathi, and English. Talks you through form-filling step by step.
- **Voice input** — Click the mic button and speak in your language (Chrome recommended).
- **Auto-fill from Aadhaar** — Detected fields are pre-filled into the selected form (PAN, Passport, Voter ID, Ration Card).
- **PDF download** — Preview the completed form and download it as a PDF.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey).

3. Add your API key to the `.env` file:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. Start the dev server:
   ```
   npm run dev
   ```

> **Note:** Without a Gemini API key, the app runs in "basic mode" with a guided fallback conversation flow. Adding the key unlocks full AI-powered conversation.

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS (custom saffron/orange theme)
- Tesseract.js (OCR)
- pdfjs-dist (PDF-to-image conversion for OCR)
- Google Gemini 1.5 Flash API (conversational AI)
- jsPDF (PDF generation)
- Web Speech API (voice input)
