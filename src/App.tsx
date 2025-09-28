import { useTranslation } from 'react-i18next';
import { Suspense, lazy } from 'react';

// Components
import { CharacterForm } from './components/CharacterForm';
import { MapSelector } from './components/MapSelector';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Instructions } from './components/Instructions';

// Lazy load the GameMap component since it uses the heavy Leaflet library
const GameMap = lazy(() => import('./components/GameMap').then((module) => ({ default: module.GameMap })));

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

	const { character, updateCharacter, moveCharacter } = useCharacter();

	const { mapConfig, availableThemes, currentCoordinates, updateMapConfig, setCurrentCoordinates } = useMap();

	useKeyboard(moveCharacter);

	return (
		<div className="app">
			<header className="app-header">
				<div className="header-content">
					<div className="header-text">
						<h1 data-testid="app-title">{t('app.title')}</h1>
						<p data-testid="app-subtitle">{t('app.subtitle')}</p>
					</div>
					<LanguageSwitcher />
				</div>
			</header>

			<main className="app-main">
				<div className="right-panel">
					<Suspense
						fallback={
							<div
								className="loading-spinner"
								style={{
									width: mapConfig.width * mapConfig.tileSize,
									height: mapConfig.height * mapConfig.tileSize,
									minHeight: 'unset',
								}}
							>
								{t('common.loading')}
							</div>
						}
					>
						<GameMap character={character} mapConfig={mapConfig} coordinates={currentCoordinates} />
					</Suspense>
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
