import type { Language } from './types';

export const languages: { code: Language; label: string; native: string; short: string }[] = [
  { code: 'en', label: 'English', native: 'English', short: 'EN' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', short: 'हि' },
  { code: 'mr', label: 'Marathi', native: 'मराठी', short: 'म' },
];

export const t = {
  // Header / nav
  appName: { en: 'BharoAI', hi: 'भरोAI', mr: 'भरोAI' },
  tagline: { en: 'AI fills your Sarkari forms', hi: 'AI भरता है आपके सरकारी फॉर्म', mr: 'AI भरते तुमचे सरकारी फॉर्म' },
  navHowItWorks: { en: 'How it works', hi: 'कैसे काम करता है', mr: 'कसे काम करते' },
  navForms: { en: 'Forms', hi: 'फॉर्म', mr: 'फॉर्म' },
  navContact: { en: 'Contact', hi: 'संपर्क', mr: 'संपर्क' },

  // Hero
  heroLine1: { en: 'Sarkari Form Bolo,', hi: 'सरकारी फॉर्म बोलो,', mr: 'सरकारी फॉर्म बोला,' },
  heroLine2: { en: 'AI Bharega.', hi: 'AI भरेगा।', mr: 'AI भरेल.' },
  heroSub: {
    en: 'Upload your Aadhaar, tell the AI what form you need in your own language, and watch your government form get filled — automatically.',
    hi: 'अपना आधार अपलोड करें, AI को अपनी भाषा में बताएं कि कौन सा फॉर्म चाहिए, और देखें आपका सरकारी फॉर्म अपने आप भर जाएगा।',
    mr: 'तुमचा आधार अपलोड करा, AI ला तुमच्या भाषेत सांगा कोणता फॉर्म हवा आहे, आणि बघा तुमचा सरकारी फॉर्म आपोआप भरला जाईल.',
  },
  heroCta: { en: 'Start filling your form', hi: 'फॉर्म भरना शुरू करें', mr: 'फॉर्म भरणे सुरू करा' },
  heroSubCta: { en: 'No login required', hi: 'लॉगिन की ज़रूरत नहीं', mr: 'लॉगिनची गरज नाही' },

  // Upload
  uploadTitle: { en: 'Upload your Aadhaar card', hi: 'अपना आधार कार्ड अपलोड करें', mr: 'तुमचे आधार कार्ड अपलोड करा' },
  uploadSubtitle: {
    en: 'AI reads your details with OCR — no typing needed.',
    hi: 'AI आपकी जानकारी OCR से पढ़ता है — टाइप करने की ज़रूरत नहीं।',
    mr: 'AI तुमची माहिती OCR कडून वाचते — टाईप करण्याची गरज नाही.',
  },
  uploadButton: { en: 'Choose Aadhaar file', hi: 'आधार फ़ाइल चुनें', mr: 'आधार फाइल निवडा' },
  uploadOr: { en: 'or drag & drop here', hi: 'यााँ खींचकर छोड़ें', mr: 'किंवा येथे ओढून सोडा' },
  uploadHint: { en: 'PDF, JPG, or PNG • Max 10 MB', hi: 'PDF, JPG या PNG • अधिकतम 10 MB', mr: 'PDF, JPG किंवा PNG • जास्तीत जास्त 10 MB' },
  uploaded: { en: 'Aadhaar scanned', hi: 'आधार स्कैन हो गया', mr: 'आधार स्कॅन झाले' },
  uploadedMsg: {
    en: 'Details extracted successfully via OCR.',
    hi: 'OCR द्वारा जानकारी सफलतापूर्वक निकाली गई।',
    mr: 'OCR द्वारे माहिती यशस्वीरित्या काढली.',
  },
  uploadedName: { en: 'Name', hi: 'नाम', mr: 'नाव' },
  uploadedDob: { en: 'Date of Birth', hi: 'जन्म तिथि', mr: 'जन्मतारीख' },
  uploadedGender: { en: 'Gender', hi: 'लिंग', mr: 'लिंग' },
  uploadedAadhaar: { en: 'Aadhaar Number', hi: 'आधार नंबर', mr: 'आधार नंबर' },
  uploadedAddress: { en: 'Address', hi: 'पता', mr: 'पत्ता' },
  uploadRemove: { en: 'Remove', hi: 'हटाएं', mr: 'काढा' },
  uploadErrorSize: {
    en: 'File is too large. Maximum 10 MB allowed.',
    hi: 'फ़ाइल बहुत बड़ी है। अधिकतम 10 MB अनुमत है।',
    mr: 'फाइल खूप मोठी आहे. जास्तीत जास्त 10 MB अनुमत आहे.',
  },
  uploadErrorType: {
    en: 'Unsupported file type. Please upload PDF, JPG, or PNG.',
    hi: 'असमर्थित फ़ाइल प्रकार। कृपया PDF, JPG या PNG अपलोड करें।',
    mr: 'असमर्थित फाइल प्रकार. कृपया PDF, JPG किंवा PNG अपलोड करा.',
  },
  uploadScanning: { en: 'Scanning your Aadhaar...', hi: 'आपका आधार स्कैन हो रहा है...', mr: 'तुमचा आधार स्कॅन होत आहे...' },
  uploadScanningOcr: { en: 'Reading text with AI OCR...', hi: 'AI OCR से टेक्स्ट पढ़ा जा रहा है...', mr: 'AI OCR कडून टेक्स्ट वाचत आहे...' },
  uploadOcrError: {
    en: 'Could not read the card clearly. Please try a clearer photo.',
    hi: 'कार्ड साफ़ पढ़ा नहीं जा सका। कृपया एक साफ़ फोटो लें।',
    mr: 'कार्ड स्पष्ट वाचता आले नाही. कृपया एक स्पष्ट फोटो घ्या.',
  },

  // Chat
  chatTitle: { en: 'Talk to BharoAI', hi: 'भरोAI से बात करें', mr: 'भरोAI शी बोला' },
  chatSubtitle: {
    en: 'Type or speak — I understand Hindi, Marathi, and English.',
    hi: 'लिखें या बोलें — मैं हिंदी, मराठी, और अंग्रेज़ी समझता हूं।',
    mr: 'लिहा किंवा बोला — मला हिंदी, मराठी, आणि इंग्रजी कळते.',
  },
  chatPlaceholder: { en: 'Type or speak your message...', hi: 'अपना संदेश लिखें या बोलें...', mr: 'तुमचा संदेश लिहा किंवा बोला...' },
  chatSend: { en: 'Send', hi: 'भेजें', mr: 'पाठवा' },
  chatListening: { en: 'Listening...', hi: 'सुन रहा हूं...', mr: 'ऐकत आहे...' },
  chatWelcome: {
    en: 'Namaste! I am BharoAI. Upload your Aadhaar above, then tell me which Sarkari form you want to fill — like PAN card, passport, voter ID, or ration card. You can type or speak in your language!',
    hi: 'नमस्ते! मैं भरोAI हूं। ऊपर अपना आधार अपलोड करें, फिर बताएं कौन सा सरकारी फॉर्म भरना है — जैसे PAN कार्ड, पासपोर्ट, वोटर ID, या राशन कार्ड। आप अपनी भाषा में लिखें या बोलें!',
    mr: 'नमस्कार! मी भरोAI आहे. वर तुमचा आधार अपलोड करा, मग सांगा कोणता सरकारी फॉर्म भरायचा आहे — जसे PAN कार्ड, पासपोर्ट, व्होटर ID, किंवा राशन कार्ड. तुम्ही तुमच्या भाषेत लिहा किंवा बोला!',
  },
  chatNoUpload: {
    en: 'Please upload your Aadhaar card first so I can pre-fill your details.',
    hi: 'कृपया पहले अपना आधार कार्ड अपलोड करें ताकि मैं आपकी जानकारी पहले से भर सकूं।',
    mr: 'कृपया आधी तुमचे आधार कार्ड अपलोड करा जेणेकरून मी तुमची माहिती आधीच भरू शकेन.',
  },
  chatGeminiOffline: {
    en: 'I am running in basic mode. Add your Gemini API key in the .env file for full AI conversation.',
    hi: 'मैं बेसिक मोड में चल रहा हूं। पूर्ण AI वार्तालाप के लिए अपनी Gemini API कुंजी .env फ़ाइल में डालें।',
    mr: 'मी बेसिक मोडमध्ये चालत आहे. संपूर्ण AI संभाषणासाठी तुमची Gemini API किल्ली .env फाइलमध्ये टाका.',
  },

  // Quick reply suggestions
  suggestionPan: { en: 'PAN Card', hi: 'PAN कार्ड', mr: 'PAN कार्ड' },
  suggestionPassport: { en: 'Passport', hi: 'पासपोर्ट', mr: 'पासपोर्ट' },
  suggestionRation: { en: 'Ration Card', hi: 'राशन कार्ड', mr: 'राशन कार्ड' },
  suggestionVoter: { en: 'Voter ID', hi: 'वोटर ID', mr: 'व्होटर ID' },

  // Form preview
  previewTitle: { en: 'Form Preview', hi: 'फॉर्म पूर्वावलोकन', mr: 'फॉर्म पूर्वावलोकन' },
  previewSubtitle: { en: 'Review your filled form before downloading', hi: 'डाउनलोड करने से पहले अपना भरा हुआ फॉर्म देखें', mr: 'डाउनलोड करण्यापूर्वी तुमचा भरलेला फॉर्म तपासा' },
  previewDownload: { en: 'Download PDF', hi: 'PDF डाउनलोड करें', mr: 'PDF डाउनलोड करा' },
  previewPrint: { en: 'Print', hi: 'प्रिंट करें', mr: 'प्रिंट करा' },
  previewEdit: { en: 'Edit details', hi: 'विवरण संपादित करें', mr: 'तपशील संपादित करा' },
  previewNewForm: { en: 'Fill another form', hi: 'दूसरा फॉर्म भरें', mr: 'दुसरा फॉर्म भरा' },
  previewFormComplete: {
    en: 'Your form is ready! Review the details below and download as PDF.',
    hi: 'आपका फॉर्म तैयार है! नीचे विवरण देखें और PDF डाउनलोड करें।',
    mr: 'तुमचा फॉर्म तयार आहे! खालील तपशील तपासा आणि PDF डाउनलोड करा.',
  },

  // Bot conversation flow (fallback when no Gemini)
  botAskForm: {
    en: 'Great! Which Sarkari form would you like to fill? You can choose from: PAN Card, Passport, Ration Card, or Voter ID.',
    hi: 'बहुत बढ़िया! आप कौन सा सरकारी फॉर्म भरना चाहते हैं? इनमें से चुन सकते हैं: PAN कार्ड, पासपोर्ट, राशन कार्ड, या वोटर ID।',
    mr: 'छान! तुम्हाला कोणता सरकारी फॉर्म भरायचा आहे? यातून निवडा: PAN कार्ड, पासपोर्ट, राशन कार्ड, किंवा व्होटर ID.',
  },
  botAskMobile: {
    en: 'What is your mobile number?',
    hi: 'आपका मोबाइल नंबर क्या है?',
    mr: 'तुमचा मोबाइल नंबर काय आहे?',
  },
  botAskEmail: {
    en: 'Got it. What is your email address?',
    hi: 'मिल गया। आपका ईमेल पता क्या है?',
    mr: 'मिळाले. तुमचा ईमेल पत्ता काय आहे?',
  },
  botAskOccupation: {
    en: 'Thank you. What is your occupation?',
    hi: 'धन्यवाद। आपका क्या काम है?',
    mr: 'धन्यवाद. तुमचा व्यवसाय काय आहे?',
  },
  botAskFather: {
    en: "What is your father's name?",
    hi: 'आपके पिता का नाम क्या है?',
    mr: 'तुमच्या वडिलांचे नाव काय आहे?',
  },
  botAskIncome: {
    en: 'What is your annual income?',
    hi: 'आपकी वार्षिक आय क्या है?',
    mr: 'तुमचे वार्षिक उत्पन्न काय आहे?',
  },
  botComplete: {
    en: 'All details collected! Your form is ready. Check the preview below.',
    hi: 'सभी जानकारी इकट्ठा हो गई! आपका फॉर्म तैयार है। नीचे पूर्वावलोकन देखें।',
    mr: 'सर्व माहिती गोळा झाली! तुमचा फॉर्म तयार आहे. खाली पूर्वावलोकन बघा.',
  },

  // Features section
  featuresTitle: { en: 'How it works', hi: 'कैसे काम करता है', mr: 'कसे काम करते' },
  featuresSubtitle: {
    en: 'Three simple steps — no paperwork, no confusion.',
    hi: 'तीन आसान कदम — कोई कागज़ात नहीं, कोई उलझन नहीं।',
    mr: 'तीन सोप्या पायऱ्या — कागदपत्रे नाहीत, गोंधळ नाही.',
  },
  feature1Title: { en: 'Upload Aadhaar', hi: 'आधार अपलोड करें', mr: 'आधार अपलोड करा' },
  feature1Desc: {
    en: 'Snap a photo or upload a PDF. AI-powered OCR reads your name, address, DOB, gender, and Aadhaar number instantly.',
    hi: 'फोटो खींचें या PDF अपलोड करें। AI-संचालित OCR आपका नाम, पता, जन्म तिथि, लिंग, और आधार नंबर तुरंत पढ़ लेता है।',
    mr: 'फोटो काढा किंवा PDF अपलोड करा. AI-चालित OCR तुमचे नाव, पत्ता, जन्मतारीख, लिंग, आणि आधार नंबर लगेच वाचतो.',
  },
  feature2Title: { en: 'Talk in your language', hi: 'अपनी भाषा में बात करें', mr: 'तुमच्या भाषेत बोला' },
  feature2Desc: {
    en: 'Type or speak in Hindi, Marathi, or English. Gemini AI understands you and guides you conversationally.',
    hi: 'हिंदी, मराठी, या अंग्रेज़ी में लिखें या बोलें। Gemini AI आपको समझता है और बातचीत से मार्गदर्शन करता है।',
    mr: 'हिंदी, मराठी, किंवा इंग्रजीत लिहा किंवा बोला. Gemini AI तुम्हाला समजते आणि संभाषणातून मार्गदर्शन करते.',
  },
  feature3Title: { en: 'Download your form', hi: 'अपना फॉर्म डाउनलोड करें', mr: 'तुमचा फॉर्म डाउनलोड करा' },
  feature3Desc: {
    en: 'Preview the filled form, then download it as a PDF — ready to print or submit.',
    hi: 'भरे हुए फॉर्म को देखें, फिर PDF के रूप में डाउनलोड करें — प्रिंट या जमा करने के लिए तैयार।',
    mr: 'भरलेला फॉर्म तपासा, मग PDF म्हणून डाउनलोड करा — प्रिंट किंवा जमा करण्यासाठी तयार.',
  },

  // Stats
  statForms: { en: 'Forms supported', hi: 'फॉर्म उपलब्ध', mr: 'फॉर्म उपलब्ध' },
  statLanguages: { en: 'Languages', hi: 'भाषाएं', mr: 'भाषा' },
  statUsers: { en: 'Happy users', hi: 'संतुष्ट उपयोगकर्ता', mr: 'समाधानी वापरकर्ते' },
  statAccuracy: { en: 'OCR accuracy', hi: 'OCR सटीकता', mr: 'OCR अचूकता' },

  // Footer
  footerTagline: {
    en: 'Empowering every citizen to fill government forms with ease — in their own language.',
    hi: 'हर नागरिक को अपनी भाषा में आसानी से सरकारी फॉर्म भरने का अधिकार।',
    mr: 'प्रत्येक नागरिकाला त्याच्या भाषेत सहज सरकारी फॉर्म भरण्याचे अधिकार.',
  },
  footerProduct: { en: 'Product', hi: 'उत्पाद', mr: 'उत्पादन' },
  footerCompany: { en: 'Company', hi: 'कंपनी', mr: 'कंपनी' },
  footerSupport: { en: 'Support', hi: 'सहायता', mr: 'सहाय्य' },
  footerRights: { en: 'All rights reserved.', hi: 'सर्वाधिकार सुरक्षित।', mr: 'सर्व हक्क राखीव.' },
  footerPrivacy: { en: 'Privacy Policy', hi: 'गोपनीयता नीति', mr: 'गोपनीयता धोरण' },
  footerTerms: { en: 'Terms of Service', hi: 'सेवा की शर्तें', mr: 'सेवेच्या अटी' },
  footerSecure: {
    en: 'Your data is encrypted and never shared with third parties.',
    hi: 'आपका डेटा एन्क्रिप्टेड है और कभी तीसरे पक्ष से साझा नहीं किया जाता।',
    mr: 'तुमचा डेटा एन्क्रिप्टेड आहे आणि कधीच तिसऱ्या पक्षांसोबत शेअर केला जात नाही.',
  },

  // Trust badges
  trustSecure: { en: 'Bank-grade encryption', hi: 'बैंक-स्तरीय एन्क्रिप्शन', mr: 'बँक-स्तरावरील एन्क्रिप्शन' },
  trustPrivate: { en: 'Your data stays private', hi: 'आपका डेटा निजी रहता है', mr: 'तुमचा डेटा खाजगी राहतो' },
  trustFree: { en: 'Free to use', hi: 'इस्तेमाल करने में मुफ़्त', mr: 'वापरण्यासाठी मोफत' },
} as const;

export type TranslationKey = keyof typeof t;

export function tr(key: TranslationKey, lang: Language): string {
  const entry = t[key];
  const val = (entry as Record<Language, unknown>)[lang];
  return typeof val === 'string' ? val : (entry as Record<Language, string>)[lang];
}
