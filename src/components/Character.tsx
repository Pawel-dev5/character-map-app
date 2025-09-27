import { type CSSProperties } from "react";
import type { Character as CharacterType, MapConfig } from "../types";
import "./Character.css";

import Bit8Svg from "../assets/svg/8-Bit-Character-1.svg?react";
import SantaSvg from "../assets/svg/1543379970.svg?react";
import CarSvg from "../assets/svg/Car_Red_Front.svg?react";

interface CharacterProps {
  character: CharacterType;
  mapConfig: MapConfig;
}

const AvatarComponents = {
  bit8: Bit8Svg,
  santa: SantaSvg,
  car: CarSvg,
  basic: "basic",
};

export const Character = ({ character, mapConfig }: CharacterProps) => {
  const { name, color, position, avatarType } = character;
  const { tileSize } = mapConfig;

  const cssVars = {
    "--character-color": color,
    "--tile-size": `${tileSize}px`,
    "--position-x": position?.x,
    "--position-y": position?.y,
    color: color,
  } as CSSProperties;

  const AvatarComponent =
    AvatarComponents[avatarType as keyof typeof AvatarComponents];

  return (
    <div className="character" style={cssVars}>
      {name && <div className="character-name">{name}</div>}
      <div className="character-avatar">
        {AvatarComponent !== "basic" && AvatarComponent ? (
          <AvatarComponent />
        ) : (
          <div className="character-circle">
            {name ? name?.[0]?.toUpperCase() : "?"}
          </div>
        )}
      </div>
    </div>
  );
};
