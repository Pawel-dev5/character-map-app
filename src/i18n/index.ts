import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import type { TranslationResource } from '../types/i18n';

const loadTranslation = async (language: string): Promise<TranslationResource | null> => {
	try {
		const translation = await import(`./locales/${language}.json`);
		return translation.default as TranslationResource;
	} catch (error) {
		console.warn(`Failed to load translation for ${language}:`, error);
		return null;
	}
};

const resources: { [key: string]: { translation: TranslationResource } } = {};

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: 'en',
		lng: 'en',
		interpolation: { escapeValue: false },
		detection: {
			order: ['localStorage', 'navigator', 'htmlTag'],
			caches: ['localStorage'],
		},
	});

const initializeTranslations = async () => {
	const supportedLanguages = ['en', 'pl'];

	const translationPromises = supportedLanguages.map(async (lang) => {
		const translation = await loadTranslation(lang);
		return { lang, translation };
	});

	const results = await Promise.all(translationPromises);

	results.forEach(({ lang, translation }) => {
		if (translation) {
			resources[lang] = { translation };
			i18n.addResourceBundle(lang, 'translation', translation);
		}
	});

	const detectedLanguage = i18n.language || 'en';
	if (resources[detectedLanguage]) {
		await i18n.changeLanguage(detectedLanguage);
	}
};

initializeTranslations().catch(console.error);

export default i18n;
