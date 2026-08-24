export type Language = 'en' | 'hi' | 'mr';

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

export type AadhaarData = {
  name: string;
  dob: string;
  gender: string;
  aadhaarNumber: string;
  address: string;
};

export type FormFieldValue = string;

export type FormDefinition = {
  id: string;
  // Display name per language
  name: Record<Language, string>;
  // Fields this form requires
  fields: FormFieldDef[];
};

export type FormFieldDef = {
  key: string;
  label: Record<Language, string>;
  // Whether this field can be auto-filled from Aadhaar
  aadhaarMapped?: 'name' | 'dob' | 'gender' | 'address' | 'aadhaarNumber';
  required: boolean;
};

export type FilledFormData = {
  formId: string;
  formName: string;
  values: Record<string, FormFieldValue>;
};

export type CollectedInfo = {
  formId?: string;
  formName?: string;
  mobile?: string;
  email?: string;
  occupation?: string;
  fatherName?: string;
  annualIncome?: string;
  [key: string]: string | undefined;
};
