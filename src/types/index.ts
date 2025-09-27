export interface Position {
  x: number;
  y: number;
}

export interface Character {
  name: string;
  color: string;
  colorName?: string;
  position: Position;
  avatarType: AvatarType;
}

export type AvatarType = "santa" | "8bit" | "car" | "basic";

export interface MapConfig {
  width: number;
  height: number;
  tileSize: number;
}

export type Direction = "up" | "down" | "left" | "right";
