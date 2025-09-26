import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useColorName } from "../hooks/useColorName";
import "./CharacterForm.css";

interface CharacterFormProps {
  name: string;
  color: string;
  colorName?: string;
  onNameChange: (name: string) => void;
  onColorChange: (color: string) => void;
  onColorNameChange: (colorName: string) => void;
}

export const CharacterForm = ({
  name,
  color,
  colorName,
  onNameChange,
  onColorChange,
  onColorNameChange,
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
      onNameChange(localName);
    }, 300);

    return () => clearTimeout(timer);
  }, [localName, onNameChange]);

  const handleColorChange = async (newColor: string) => {
    onColorChange(newColor);
    clearError();

    const colorNameResult = await fetchColorName(newColor);
    if (colorNameResult) {
      onColorNameChange(colorNameResult);
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
