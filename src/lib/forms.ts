import type { FormDefinition, Language } from '@/types';

export const FORMS: FormDefinition[] = [
  {
    id: 'pan',
    name: { en: 'PAN Card Application', hi: 'PAN कार्ड आवेदन', mr: 'PAN कार्ड अर्ज' },
    fields: [
      { key: 'name', label: { en: 'Full Name', hi: 'पूरा नाम', mr: 'संपूर्ण नाव' }, aadhaarMapped: 'name', required: true },
      { key: 'dob', label: { en: 'Date of Birth', hi: 'जन्म तिथि', mr: 'जन्मतारीख' }, aadhaarMapped: 'dob', required: true },
      { key: 'gender', label: { en: 'Gender', hi: 'लिंग', mr: 'लिंग' }, aadhaarMapped: 'gender', required: true },
      { key: 'fatherName', label: { en: "Father's Name", hi: 'पिता का नाम', mr: 'वडिलांचे नाव' }, required: true },
      { key: 'address', label: { en: 'Address', hi: 'पता', mr: 'पत्ता' }, aadhaarMapped: 'address', required: true },
      { key: 'mobile', label: { en: 'Mobile Number', hi: 'मोबाइल नंबर', mr: 'मोबाइल नंबर' }, required: true },
      { key: 'email', label: { en: 'Email', hi: 'ईमेल', mr: 'ईमेल' }, required: true },
      { key: 'aadhaarNumber', label: { en: 'Aadhaar Number', hi: 'आधार नंबर', mr: 'आधार नंबर' }, aadhaarMapped: 'aadhaarNumber', required: true },
    ],
  },
  {
    id: 'passport',
    name: { en: 'Passport Application', hi: 'पासपोर्ट आवेदन', mr: 'पासपोर्ट अर्ज' },
    fields: [
      { key: 'name', label: { en: 'Full Name', hi: 'पूरा नाम', mr: 'संपूर्ण नाव' }, aadhaarMapped: 'name', required: true },
      { key: 'dob', label: { en: 'Date of Birth', hi: 'जन्म तिथि', mr: 'जन्मतारीख' }, aadhaarMapped: 'dob', required: true },
      { key: 'gender', label: { en: 'Gender', hi: 'लिंग', mr: 'लिंग' }, aadhaarMapped: 'gender', required: true },
      { key: 'address', label: { en: 'Address', hi: 'पता', mr: 'पत्ता' }, aadhaarMapped: 'address', required: true },
      { key: 'mobile', label: { en: 'Mobile Number', hi: 'मोबाइल नंबर', mr: 'मोबाइल नंबर' }, required: true },
      { key: 'email', label: { en: 'Email', hi: 'ईमेल', mr: 'ईमेल' }, required: true },
      { key: 'occupation', label: { en: 'Occupation', hi: 'व्यवसाय', mr: 'व्यवसाय' }, required: true },
      { key: 'aadhaarNumber', label: { en: 'Aadhaar Number', hi: 'आधार नंबर', mr: 'आधार नंबर' }, aadhaarMapped: 'aadhaarNumber', required: true },
    ],
  },
  {
    id: 'voter',
    name: { en: 'Voter ID Application', hi: 'वोटर ID आवेदन', mr: 'व्होटर ID अर्ज' },
    fields: [
      { key: 'name', label: { en: 'Full Name', hi: 'पूरा नाम', mr: 'संपूर्ण नाव' }, aadhaarMapped: 'name', required: true },
      { key: 'dob', label: { en: 'Date of Birth', hi: 'जन्म तिथि', mr: 'जन्मतारीख' }, aadhaarMapped: 'dob', required: true },
      { key: 'gender', label: { en: 'Gender', hi: 'लिंग', mr: 'लिंग' }, aadhaarMapped: 'gender', required: true },
      { key: 'address', label: { en: 'Address', hi: 'पता', mr: 'पत्ता' }, aadhaarMapped: 'address', required: true },
      { key: 'fatherName', label: { en: "Father's Name", hi: 'पिता का नाम', mr: 'वडिलांचे नाव' }, required: true },
      { key: 'mobile', label: { en: 'Mobile Number', hi: 'मोबाइल नंबर', mr: 'मोबाइल नंबर' }, required: true },
      { key: 'aadhaarNumber', label: { en: 'Aadhaar Number', hi: 'आधार नंबर', mr: 'आधार नंबर' }, aadhaarMapped: 'aadhaarNumber', required: false },
    ],
  },
  {
    id: 'ration',
    name: { en: 'Ration Card Application', hi: 'राशन कार्ड आवेदन', mr: 'राशन कार्ड अर्ज' },
    fields: [
      { key: 'name', label: { en: 'Head of Family Name', hi: 'परिवार मुखिया का नाम', mr: 'कुटुंब प्रमुखाचे नाव' }, aadhaarMapped: 'name', required: true },
      { key: 'dob', label: { en: 'Date of Birth', hi: 'जन्म तिथि', mr: 'जन्मतारीख' }, aadhaarMapped: 'dob', required: true },
      { key: 'address', label: { en: 'Address', hi: 'पता', mr: 'पत्ता' }, aadhaarMapped: 'address', required: true },
      { key: 'mobile', label: { en: 'Mobile Number', hi: 'मोबाइल नंबर', mr: 'मोबाइल नंबर' }, required: true },
      { key: 'annualIncome', label: { en: 'Annual Income', hi: 'वार्षिक आय', mr: 'वार्षिक उत्पन्न' }, required: true },
      { key: 'occupation', label: { en: 'Occupation', hi: 'व्यवसाय', mr: 'व्यवसाय' }, required: true },
      { key: 'aadhaarNumber', label: { en: 'Aadhaar Number', hi: 'आधार नंबर', mr: 'आधार नंबर' }, aadhaarMapped: 'aadhaarNumber', required: true },
    ],
  },
];

export function getFormById(id: string): FormDefinition | undefined {
  return FORMS.find((f) => f.id === id);
}

export function detectForm(text: string): FormDefinition | null {
  const lower = text.toLowerCase();
  if (lower.includes('pan') || lower.includes('पैन')) return FORMS[0];
  if (lower.includes('passport') || lower.includes('पासपोर्ट')) return FORMS[1];
  if (lower.includes('voter') || lower.includes('वोटर') || lower.includes('व्होटर')) return FORMS[2];
  if (lower.includes('ration') || lower.includes('राशन')) return FORMS[3];
  return null;
}

export function autoFillFromAadhaar(
  form: FormDefinition,
  aadhaar: import('@/types').AadhaarData,
): Record<string, string> {
  const values: Record<string, string> = {};
  for (const field of form.fields) {
    if (field.aadhaarMapped) {
      values[field.key] = aadhaar[field.aadhaarMapped] ?? '';
    }
  }
  return values;
}

export function getFormName(formId: string, lang: Language): string {
  const form = getFormById(formId);
  return form ? form.name[lang] : formId;
}
