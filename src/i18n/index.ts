import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import type { TranslationResource } from '../types/i18n';

import enTranslations from './locales/en.json';
import plTranslations from './locales/pl.json';

const resources = {
	en: {
		translation: enTranslations as TranslationResource,
	},
	pl: {
		translation: plTranslations as TranslationResource,
	},
};

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: 'en',
		interpolation: { escapeValue: false },
		detection: {
			order: ['localStorage', 'navigator', 'htmlTag'],
			caches: ['localStorage'],
		},
	});

export default i18n;
