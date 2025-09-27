export interface MapTheme {
  id: string;
  name: string;
  type: "topographic" | "pixel" | "abstract";
  description: string;
  tileUrl?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  gridColor?: string;
  borderColor?: string;
}

export interface MapPosition {
  x: number;
  y: number;
  zoom: number;
}

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
  address: string;
}

export interface MapConfig {
  width: number;
  height: number;
  tileSize: number;
  theme: MapTheme;
}
