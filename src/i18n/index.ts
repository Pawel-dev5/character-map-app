import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import pl from './locales/pl.json';

const resources = {
	en: {
		translation: en,
	},
	pl: {
		translation: pl,
	},
};

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: 'en',
		lng: 'en',

		interpolation: {
			escapeValue: false,
		},

		detection: {
			order: ['localStorage', 'navigator', 'htmlTag'],
			caches: ['localStorage'],
		},

		debug: process.env.NODE_ENV === 'development',
	});

export default i18n;
