import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

export const LanguageSwitcher = () => {
	const { t, i18n } = useTranslation();

	const changeLanguage = (language: string) => {
		i18n.changeLanguage(language);
	};

	const currentLanguage = i18n.language;

	return (
		<div className="language-switcher">
			{/* <span className="language-label">{t("language.switch")}</span> */}
			<div className="language-buttons">
				<button
					className={`language-button ${currentLanguage === 'en' ? 'active' : ''}`}
					onClick={() => changeLanguage('en')}
					aria-label={t('language.switchTo', { language: 'English' })}
					aria-pressed={currentLanguage === 'en'}
					title={t('language.switchTo', { language: 'English' })}
					role="button"
					type="button"
				>
					EN
				</button>
				<button
					className={`language-button ${currentLanguage === 'pl' ? 'active' : ''}`}
					onClick={() => changeLanguage('pl')}
					aria-label={t('language.switchTo', { language: 'Polski' })}
					aria-pressed={currentLanguage === 'pl'}
					title={t('language.switchTo', { language: 'Polski' })}
					role="button"
					type="button"
				>
					PL
				</button>
			</div>
		</div>
	);
};
