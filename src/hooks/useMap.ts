import { useState, useCallback, useEffect } from "react";
import type { MapConfig, GeoCoordinates } from "../types/map";
import { MAP_THEMES, getThemeById } from "../data/mapThemes";
import { mapStorage } from "../utils/localStorage";

const DEFAULT_MAP_CONFIG: MapConfig = {
  width: 20,
  height: 15,
  tileSize: 32,
  theme: MAP_THEMES[3],
};

export const useMap = () => {
  const [mapConfig, setMapConfig] = useState<MapConfig>(() => {
    const savedThemeId = mapStorage.getThemeId(MAP_THEMES[3].id);
    const savedTheme = getThemeById(savedThemeId);

    return { ...DEFAULT_MAP_CONFIG, theme: savedTheme };
  });

  const [currentCoordinates, setCurrentCoordinates] =
    useState<GeoCoordinates | null>(() => {
      return mapStorage.getCoordinates();
    });

  const updateMapConfig = useCallback(
    <K extends keyof MapConfig>(key: K, value: MapConfig[K]) => {
      setMapConfig((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // Effect to persist map theme to localStorage
  useEffect(() => {
    if (mapConfig?.theme?.id) {
      mapStorage.setThemeId(mapConfig.theme.id);
    }
  }, [mapConfig?.theme?.id]);

  // Effect to persist coordinates to localStorage
  useEffect(() => {
    mapStorage.setCoordinates(currentCoordinates);
  }, [currentCoordinates]);

  return {
    mapConfig,
    availableThemes: MAP_THEMES,
    currentCoordinates,
    updateMapConfig,
    setCurrentCoordinates,
  };
};
