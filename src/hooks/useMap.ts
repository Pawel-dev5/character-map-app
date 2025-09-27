import { useState, useCallback } from "react";
import type { MapConfig, GeoCoordinates } from "../types/map";
import { MAP_THEMES, getThemeById } from "../data/mapThemes";

const DEFAULT_MAP_CONFIG: MapConfig = {
  width: 20,
  height: 15,
  tileSize: 32,
  theme: MAP_THEMES[3],
};

export const useMap = () => {
  const [mapConfig, setMapConfig] = useState<MapConfig>(DEFAULT_MAP_CONFIG);
  const [currentCoordinates, setCurrentCoordinates] =
    useState<GeoCoordinates | null>(null);

  const changeTheme = useCallback((themeId: string) => {
    const newTheme = getThemeById(themeId);
    setMapConfig((prev) => ({ ...prev, theme: newTheme }));
  }, []);

  const updateMapSize = useCallback((width: number, height: number) => {
    setMapConfig((prev) => ({ ...prev, width, height }));
  }, []);

  const updateTileSize = useCallback((tileSize: number) => {
    setMapConfig((prev) => ({ ...prev, tileSize }));
  }, []);

  return {
    mapConfig,
    availableThemes: MAP_THEMES,
    changeTheme,
    updateMapSize,
    updateTileSize,
    currentCoordinates,
    setCurrentCoordinates,
  };
};
