import { useTranslation } from "react-i18next";

// Components
import { CharacterForm } from "./components/CharacterForm";
import { GameMap } from "./components/GameMap";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { Instructions } from "./components/Instructions";

// Hooks
import { useCharacter } from "./hooks/useCharacter";
import { useKeyboard } from "./hooks/useKeyboard";
import { useMap } from "./hooks/useMap";

// Styles
import "./i18n";
import "./App.css";

function App() {
  const { t } = useTranslation();

  const {
    character,
    updateCharacterName,
    updateCharacterColor,
    updateCharacterColorName,
    updateCharacterAvatarType,
    moveCharacter,
    resetCharacterPosition,
  } = useCharacter();

  const {
    mapConfig,
    availableThemes,
    currentCoordinates,
    changeTheme,
    setCurrentCoordinates,
  } = useMap();

  useKeyboard(moveCharacter);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-text">
            <h1>{t("app.title")}</h1>
            <p>{t("app.subtitle")}</p>
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
            onLocationChange={resetCharacterPosition}
          />
        </div>

        <div className="left-panel">
          <CharacterForm
            name={character?.name}
            color={character?.color}
            colorName={character?.colorName}
            avatarType={character?.avatarType}
            onNameChange={updateCharacterName}
            onColorChange={updateCharacterColor}
            onColorNameChange={updateCharacterColorName}
            onAvatarTypeChange={updateCharacterAvatarType}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
