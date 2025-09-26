import { useTranslation } from "react-i18next";

// Components
import { CharacterForm } from "./components/CharacterForm";

// Hooks
import { useCharacter } from "./hooks/useCharacter";
import { useKeyboard } from "./hooks/useKeyboard";

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
    moveCharacter,
    resetCharacterPosition,
  } = useCharacter();

  useKeyboard(moveCharacter);

  return (
    <div className="app">
      <main className="app-main">
        <div className="left-panel">
          <CharacterForm
            name={character?.name}
            color={character?.color}
            colorName={character?.colorName}
            onNameChange={updateCharacterName}
            onColorChange={updateCharacterColor}
            onColorNameChange={updateCharacterColorName}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
