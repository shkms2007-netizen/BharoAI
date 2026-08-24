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
    en: 'We read your details automatically — no typing needed.',
    hi: 'हम आपकी जानकारी अपने आप पढ़ लेते हैं — टाइप करने की ज़रूरत नहीं।',
    mr: 'आम्ही तुमची माहिती आपोआप वाचतो — टाईप करण्याची गरज नाही.',
  },
  uploadButton: { en: 'Choose Aadhaar file', hi: 'आधार फ़ाइल चुनें', mr: 'आधार फाइल निवडा' },
  uploadOr: { en: 'or drag & drop here', hi: 'यााँ खींचकर छोड़ें', mr: 'किंवा येथे ओढून सोडा' },
  uploadHint: { en: 'PDF, JPG, or PNG • Max 10 MB', hi: 'PDF, JPG या PNG • अधिकतम 10 MB', mr: 'PDF, JPG किंवा PNG • जास्तीत जास्त 10 MB' },
  uploaded: { en: 'Uploaded', hi: 'अपलोड हो गया', mr: 'अपलोड झाले' },
  uploadedMsg: {
    en: 'Aadhaar details extracted successfully.',
    hi: 'आधार की जानकारी सफलतापूर्वक निकाली गई।',
    mr: 'आधारची माहिती यशस्वीरित्या काढली.',
  },
  uploadedName: { en: 'Detected name', hi: 'पहचाना गया नाम', mr: 'ओळखलेले नाव' },
  uploadedDob: { en: 'Detected date of birth', hi: 'पहचानी गई जन्म तिथि', mr: 'ओळखलेली जन्मतारीख' },
  uploadedAddress: { en: 'Detected address', hi: 'पहचाना गया पता', mr: 'ओळखला पत्ता' },
  uploadRemove: { en: 'Remove', hi: 'हटाएं', mr: 'काढा' },
  uploadError: {
    en: 'Please select a valid PDF, JPG, or PNG file under 10 MB.',
    hi: 'कृपया 10 MB से कम की एक मान्य PDF, JPG या PNG फ़ाइल चुनें।',
    mr: 'कृपया 10 MB पेक्षा कमी एक वैध PDF, JPG किंवा PNG फाइल निवडा.',
  },
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

  // Chat
  chatTitle: { en: 'Talk to BharoAI', hi: 'भरोAI से बात करें', mr: 'भरोAI शी बोला' },
  chatSubtitle: {
    en: 'Tell me which form you need — I will guide you step by step.',
    hi: 'मुझे बताएं कि कौन सा फॉर्म चाहिए — मैं आपका कदम-कदम मार्गदर्शन करूंगा।',
    mr: 'मला सांगा कोणता फॉर्म हवा आहे — मी तुम्हाला हळूहळू मार्गदर्शन करेन.',
  },
  chatPlaceholder: { en: 'Type your message...', hi: 'अपना संदेश लिखें...', mr: 'तुमचा संदेश लिहा...' },
  chatSend: { en: 'Send', hi: 'भेजें', mr: 'पाठवा' },
  chatThinking: { en: 'BharoAI is typing...', hi: 'भरोAI टाइप कर रहा है...', mr: 'भरोAI टाईप करत आहे...' },
  chatWelcome: {
    en: 'Namaste! I am BharoAI. Upload your Aadhaar above, then tell me which Sarkari form you want to fill — like PAN card, passport, ration card, or voter ID. I will guide you in your language.',
    hi: 'नमस्ते! मैं भरोAI हूं। ऊपर अपना आधार अपलोड करें, फिर बताएं कौन सा सरकारी फॉर्म भरना है — जैसे PAN कार्ड, पासपोर्ट, राशन कार्ड, या वोटर ID। मैं आपकी भाषा में मार्गदर्शन करूंगा।',
    mr: 'नमस्कार! मी भरोAI आहे. वर तुमचा आधार अपलोड करा, मग सांगा कोणता सरकारी फॉर्म भरायचा आहे — जसे PAN कार्ड, पासपोर्ट, राशन कार्ड, किंवा व्होटर ID. मी तुमच्या भाषेत मार्गदर्शन करेन.',
  },
  chatNoUpload: {
    en: 'Please upload your Aadhaar card first so I can pre-fill your details.',
    hi: 'कृपया पहले अपना आधार कार्ड अपलोड करें ताकि मैं आपकी जानकारी पहले से भर सकूं।',
    mr: 'कृपया आधी तुमचे आधार कार्ड अपलोड करा जेणेकरून मी तुमची माहिती आधीच भरू शकेन.',
  },

  // Bot conversation flow
  botAskForm: {
    en: 'Great! Which Sarkari form would you like to fill? You can choose from: PAN Card, Passport, Ration Card, Voter ID, or tell me another one.',
    hi: 'बहुत बढ़िया! आप कौन सा सरकारी फॉर्म भरना चाहते हैं? इनमें से चुन सकते हैं: PAN कार्ड, पासपोर्ट, राशन कार्ड, वोटर ID, या कोई और बताएं।',
    mr: 'छान! तुम्हाला कोणता सरकारी फॉर्म भरायचा आहे? यातून निवडा: PAN कार्ड, पासपोर्ट, राशन कार्ड, व्होटर ID, किंवा दुसरे सांगा.',
  },
  botConfirmForm: {
    en: (f: string) => `You selected: ${f}. I have pre-filled your name, date of birth, and address from your Aadhaar. Now I need a few more details. What is your mobile number?`,
    hi: (f: string) => `आपने चुना: ${f}। मैंने आपके आधार से आपका नाम, जन्म तिथि, और पता पहले से भर दिया है। अब मुझे कुछ और जानकारी चाहिए। आपका मोबाइल नंबर क्या है?`,
    mr: (f: string) => `तुम्ही निवडले: ${f}. मी तुमच्या आधारवरून तुमचे नाव, जन्मतारीख आणि पत्ता आधीच भरले आहेत. आता मला थोडी अधिक माहिती हवी आहे. तुमचा मोबाइल नंबर काय आहे?`,
  },
  botAskEmail: {
    en: 'Got it. What is your email address?',
    hi: 'मिल गया। आपका ईमेल पता क्या है?',
    mr: 'मिळाले. तुमचा ईमेल पत्ता काय आहे?',
  },
  botAskOccupation: {
    en: 'Thank you. What is your occupation? (e.g., student, farmer, businessman, government employee)',
    hi: 'धन्यवाद। आपका क्या काम है? (जैसे, छात्र, किसान, व्यवसायी, सरकारी कर्मचारी)',
    mr: 'धन्यवाद. तुमचा व्यवसाय काय आहे? (उदा. विद्यार्थी, शेतकरी, व्यवसायी, सरकारी कर्मचारी)',
  },
  botComplete: {
    en: 'All details collected! Your form is ready. Here is a summary of what I filled:',
    hi: 'सभी जानकारी इकट्ठा हो गई! आपका फॉर्म तैयार है। यहाँ देखें मैंने क्या भरा:',
    mr: 'सर्व माहिती गोळा झाली! तुमचा फॉर्म तयार आहे. बघा मी काय भरले:',
  },
  botSummaryName: { en: 'Name', hi: 'नाम', mr: 'नाव' },
  botSummaryDob: { en: 'Date of Birth', hi: 'जन्म तिथि', mr: 'जन्मतारीख' },
  botSummaryAddress: { en: 'Address', hi: 'पता', mr: 'पत्ता' },
  botSummaryMobile: { en: 'Mobile', hi: 'मोबाइल', mr: 'मोबाइल' },
  botSummaryEmail: { en: 'Email', hi: 'ईमेल', mr: 'ईमेल' },
  botSummaryOccupation: { en: 'Occupation', hi: 'व्यवसाय', mr: 'व्यवसाय' },
  botSummaryForm: { en: 'Form type', hi: 'फॉर्म प्रकार', mr: 'फॉर्म प्रकार' },
  botDownload: {
    en: 'Your form has been filled. You can download or print it now.',
    hi: 'आपका फॉर्म भर दिया गया है। आप इसे डाउनलोड या प्रिंट कर सकते हैं।',
    mr: 'तुमचा फॉर्म भरला गेला आहे. तुम्ही तो डाउनलोड किंवा प्रिंट करू शकता.',
  },
  botDownloadBtn: { en: 'Download filled form', hi: 'भरा हुआ फॉर्म डाउनलोड करें', mr: 'भरलेला फॉर्म डाउनलोड करा' },
  botPrintBtn: { en: 'Print form', hi: 'फॉर्म प्रिंट करें', mr: 'फॉर्म प्रिंट करा' },
  botRestart: { en: 'Fill another form', hi: 'दूसरा फॉर्म भरें', mr: 'दुसरा फॉर्म भरा' },

  // Quick reply suggestions
  suggestionPan: { en: 'PAN Card', hi: 'PAN कार्ड', mr: 'PAN कार्ड' },
  suggestionPassport: { en: 'Passport', hi: 'पासपोर्ट', mr: 'पासपोर्ट' },
  suggestionRation: { en: 'Ration Card', hi: 'राशन कार्ड', mr: 'राशन कार्ड' },
  suggestionVoter: { en: 'Voter ID', hi: 'वोटर ID', mr: 'व्होटर ID' },

  // Features section
  featuresTitle: { en: 'How it works', hi: 'कैसे काम करता है', mr: 'कसे काम करते' },
  featuresSubtitle: {
    en: 'Three simple steps — no paperwork, no confusion.',
    hi: 'तीन आसान कदम — कोई कागज़ात नहीं, कोई उलझन नहीं।',
    mr: 'तीन सोप्या पायऱ्या — कागदपत्रे नाहीत, गोंधळ नाही.',
  },
  feature1Title: { en: 'Upload Aadhaar', hi: 'आधार अपलोड करें', mr: 'आधार अपलोड करा' },
  feature1Desc: {
    en: 'Snap a photo or upload a PDF. AI reads your name, address, and date of birth instantly.',
    hi: 'फोटो खींचें या PDF अपलोड करें। AI आपका नाम, पता, और जन्म तिथि तुरंत पढ़ लेता है।',
    mr: 'फोटो काढा किंवा PDF अपलोड करा. AI तुमचे नाव, पत्ता आणि जन्मतारीख लगेच वाचतो.',
  },
  feature2Title: { en: 'Talk in your language', hi: 'अपनी भाषा में बात करें', mr: 'तुमच्या भाषेत बोला' },
  feature2Desc: {
    en: 'Tell the AI which form you need — in Hindi, Marathi, or English. It understands and guides you.',
    hi: 'AI को अपनी भाषा में बताएं कि कौन सा फॉर्म चाहिए — हिंदी, मराठी, या अंग्रेज़ी में। यह समझता है और मार्गदर्शन करता है।',
    mr: 'AI ला तुमच्या भाषेत सांगा कोणता फॉर्म हवा — हिंदी, मराठी, किंवा इंग्रजीत. ते समजते आणि मार्गदर्शन करते.',
  },
  feature3Title: { en: 'Get your filled form', hi: 'भरा हुआ फॉर्म पाएं', mr: 'भरलेला फॉर्म मिळवा' },
  feature3Desc: {
    en: 'AI fills every field automatically. Download, print, or submit — done in minutes.',
    hi: 'AI हर खाना अपने आप भर देता है। डाउनलोड, प्रिंट, या जमा करें — मिनटों में हो जाए।',
    mr: 'AI प्रत्येक रकाना आपोआप भरतो. डाउनलोड, प्रिंट, किंवा जमा करा — मिनिटांत होते.',
  },

  // Stats
  statForms: { en: 'Forms supported', hi: 'फॉर्म उपलब्ध', mr: 'फॉर्म उपलब्ध' },
  statLanguages: { en: 'Languages', hi: 'भाषाएं', mr: 'भाषा' },
  statUsers: { en: 'Happy users', hi: 'संतुष्ट उपयोगकर्ता', mr: 'समाधानी वापरकर्ते' },
  statAccuracy: { en: 'Filling accuracy', hi: 'भरने की सटीकता', mr: 'भरण्याची अचूकता' },

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
};

export type TranslationKey = keyof typeof t;

export function tr(key: TranslationKey, lang: Language): string {
  const entry = t[key];
  const val = (entry as Record<Language, unknown>)[lang];
  return typeof val === 'string' ? val : (entry as Record<Language, string>)[lang];
}

export function trFn(key: 'botConfirmForm', lang: Language, arg: string): string {
  const entry = t[key];
  const val = (entry as Record<Language, unknown>)[lang];
  return typeof val === 'function' ? (val as (a: string) => string)(arg) : (val as string);
}
