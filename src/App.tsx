import { useTranslation } from 'react-i18next';

// Components
import { CharacterForm } from './components/CharacterForm';
import { GameMap } from './components/GameMap';
import { MapSelector } from './components/MapSelector';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Instructions } from './components/Instructions';

// Hooks
import { useCharacter } from './hooks/useCharacter';
import { useKeyboard } from './hooks/useKeyboard';
import { useMap } from './hooks/useMap';

// Styles
import './i18n';
import './App.css';
import { getThemeById } from './data/mapThemes';

const App = () => {
	const { t } = useTranslation();

	const { character, updateCharacter, moveCharacter, resetCharacterPosition } = useCharacter();

	const { mapConfig, availableThemes, currentCoordinates, updateMapConfig, setCurrentCoordinates } = useMap();

	useKeyboard(moveCharacter);

	return (
		<div className="app">
			<header className="app-header">
				<div className="header-content">
					<div className="header-text">
						<h1>{t('app.title')}</h1>
						<p>{t('app.subtitle')}</p>
					</div>
					<LanguageSwitcher />
				</div>
			</header>

			<main className="app-main">
				<div className="right-panel">
					<GameMap
						character={character}
						mapConfig={mapConfig}
						coordinates={currentCoordinates}
						onLocationChange={() => {
							// Reset position only for topographic maps when location changes
							// Keep position for gaming maps (pixel type)
							const shouldReset = mapConfig.theme.type === 'topographic';
							resetCharacterPosition(shouldReset);
						}}
					/>
					<Instructions />
				</div>

				<div className="left-panel">
					<CharacterForm
						name={character?.name}
						color={character?.color}
						colorName={character?.colorName}
						avatarType={character?.avatarType}
						updateCharacter={updateCharacter}
					/>

					<MapSelector
						currentTheme={mapConfig.theme}
						availableThemes={availableThemes}
						onThemeChange={(themeId) => updateMapConfig('theme', getThemeById(themeId))}
						onCoordinatesChange={setCurrentCoordinates}
					/>
				</div>
			</main>
		</div>
	);
};

export default App;
