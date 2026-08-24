export type Language = 'en' | 'hi' | 'mr';

export type FormField = {
  key: string;
  // values per language
  label: Record<Language, string>;
  placeholder: Record<Language, string>;
};

export type ChatMessage = {
  id: string;
  role: 'bot' | 'user';
  text: string;
  timestamp: number;
};

export type UploadedFile = {
  name: string;
  size: number;
  type: string;
};
