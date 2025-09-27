import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useColorName } from "../hooks/useColorName";
import type { AvatarType, Character } from "../types";
import "./CharacterForm.css";

interface CharacterFormProps {
  name: string;
  color: string;
  colorName?: string;
  avatarType: AvatarType;
  updateCharacter: (
    key: keyof Character,
    value: Character[keyof Character]
  ) => void;
}

export const CharacterForm = ({
  name,
  color,
  colorName,
  avatarType,
  updateCharacter,
}: CharacterFormProps) => {
  const { t } = useTranslation();
  const [localName, setLocalName] = useState(name);

  const {
    fetchColorName,
    loading,
    error,
    clearError,
    isNetworkError,
    isTimeoutError,
    isInvalidColorError,
  } = useColorName();

  useEffect(() => {
    const timer = setTimeout(() => {
      updateCharacter("name", localName);
    }, 300);

    return () => clearTimeout(timer);
  }, [localName, updateCharacter]);

  const handleColorChange = async (newColor: string) => {
    updateCharacter("color", newColor);
    clearError();

    const colorNameResult = await fetchColorName(newColor);
    if (colorNameResult) {
      updateCharacter("colorName", colorNameResult);
    }
  };

  const getColorInfoClass = () => {
    if (loading) return "color-info loading";
    if (error) {
      if (isNetworkError) return "color-info error network";
      if (isTimeoutError) return "color-info error timeout";
      if (isInvalidColorError) return "color-info error invalid";
      return "color-info error";
    }
    if (colorName) return "color-info success";
    return "color-info";
  };

  const getErrorIcon = () => {
    if (isNetworkError) return "📡";
    if (isTimeoutError) return "⏱️";
    if (isInvalidColorError) return "🎨";
    return "❌";
  };

  return (
    <div className="character-form-container">
      <form className="character-form">
        <div className="form-field">
          <label className="form-label" htmlFor="character-name-input">
            {t("characterForm.nameLabel")}
          </label>
          <input
            id="character-name-input"
            type="text"
            value={localName}
            onChange={(e) => setLocalName(e?.target?.value)}
            placeholder={t("characterForm.namePlaceholder")}
            className="form-input"
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="character-avatar-select">
            {t("characterForm.avatarLabel", "Typ postaci")}
          </label>
          <select
            id="character-avatar-select"
            value={avatarType}
            onChange={(e) =>
              updateCharacter("avatarType", e?.target?.value as AvatarType)
            }
            className="form-select avatar-select"
          >
            <option value="basic">
              {t("characterForm.avatarRogue", "Basic")}
            </option>
            <option value="bit8">
              {t("characterForm.avatarWarrior", "8-bit Character")}
            </option>
            <option value="santa">
              {t("characterForm.avatarMage", "Santa")}
            </option>
            <option value="car">
              {t("characterForm.avatarArcher", "Car")}
            </option>
          </select>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="character-color-input">
            {t("characterForm.colorLabel")}
          </label>
          <div className="color-input-container">
            <input
              id="character-color-input"
              type="color"
              value={color}
              onChange={(e) => handleColorChange(e?.target?.value)}
              className="color-input"
            />
            <span className={getColorInfoClass()}>
              {loading && t("characterForm.colorLoading")}
              {error && (
                <span title={error}>
                  {t("characterForm.colorError", {
                    icon: getErrorIcon(),
                    message: error,
                  })}
                </span>
              )}
              {colorName && !loading && !error && (
                <span>{t("characterForm.colorSuccess", { colorName })}</span>
              )}
              {!colorName && !loading && !error && (
                <span style={{ opacity: 0.6 }}>
                  {t("characterForm.colorPlaceholder")}
                </span>
              )}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
