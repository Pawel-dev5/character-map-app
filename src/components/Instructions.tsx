import { useTranslation } from "react-i18next";
import "./Instructions.css";

export const Instructions = () => {
  const { t } = useTranslation();

  return (
    <div className="instructions-container">
      <div className="instructions-header">
        <h3>{t("characterForm.instructions.title")}</h3>
      </div>
      <div className="instructions-content">
        <ul>
          <li>{t("characterForm.instructions.enterName")}</li>
          <li>{t("characterForm.instructions.selectColor")}</li>
          <li>
            {t("characterForm.instructions.selectMap")}
            <ul className="map-types">
              <li>{t("characterForm.instructions.mapTypes.topographic")}</li>
              <li>{t("characterForm.instructions.mapTypes.pixel")}</li>
            </ul>
          </li>
          <li>{t("characterForm.instructions.useArrows")}</li>
        </ul>
      </div>
    </div>
  );
};
