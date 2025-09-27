const STORAGE_KEYS = {
  CHARACTER_COLOR: "characterMapApp_characterColor",
  CHARACTER_COLOR_NAME: "characterMapApp_characterColorName",
  CHARACTER_NAME: "characterMapApp_characterName",
  CHARACTER_AVATAR_TYPE: "characterMapApp_characterAvatarType",
  CHARACTER_POSITION: "characterMapApp_characterPosition",
  MAP_THEME_ID: "characterMapApp_mapThemeId",
  MAP_COORDINATES: "characterMapApp_mapCoordinates",
} as const;

const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`Failed to parse localStorage item "${key}":`, error);
    return defaultValue;
  }
};

const setInStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Failed to save to localStorage key "${key}":`, error);
  }
};

export const characterStorage = {
  getColor: (defaultValue: string): string =>
    getFromStorage(STORAGE_KEYS.CHARACTER_COLOR, defaultValue),

  setColor: (color: string): void =>
    setInStorage(STORAGE_KEYS.CHARACTER_COLOR, color),

  getColorName: (): string | undefined =>
    getFromStorage<string | undefined>(
      STORAGE_KEYS.CHARACTER_COLOR_NAME,
      undefined
    ),

  setColorName: (colorName: string): void =>
    setInStorage(STORAGE_KEYS.CHARACTER_COLOR_NAME, colorName),

  getName: (defaultValue: string): string =>
    getFromStorage(STORAGE_KEYS.CHARACTER_NAME, defaultValue),

  setName: (name: string): void =>
    setInStorage(STORAGE_KEYS.CHARACTER_NAME, name),

  getAvatarType: (defaultValue: string): string =>
    getFromStorage(STORAGE_KEYS.CHARACTER_AVATAR_TYPE, defaultValue),

  setAvatarType: (avatarType: string): void =>
    setInStorage(STORAGE_KEYS.CHARACTER_AVATAR_TYPE, avatarType),

  getPosition: (defaultValue: {
    x: number;
    y: number;
  }): { x: number; y: number } =>
    getFromStorage(STORAGE_KEYS.CHARACTER_POSITION, defaultValue),

  setPosition: (position: { x: number; y: number }): void =>
    setInStorage(STORAGE_KEYS.CHARACTER_POSITION, position),
};

export const mapStorage = {
  getThemeId: (defaultValue: string): string =>
    getFromStorage(STORAGE_KEYS.MAP_THEME_ID, defaultValue),

  setThemeId: (themeId: string): void =>
    setInStorage(STORAGE_KEYS.MAP_THEME_ID, themeId),

  getCoordinates: () =>
    getFromStorage<{
      latitude: number;
      longitude: number;
      address: string;
    } | null>(STORAGE_KEYS.MAP_COORDINATES, null),

  setCoordinates: (
    coordinates: { latitude: number; longitude: number; address: string } | null
  ): void => setInStorage(STORAGE_KEYS.MAP_COORDINATES, coordinates),
};

export const clearAllStorage = (): void => {
  Object.values(STORAGE_KEYS).forEach((key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Failed to remove localStorage key "${key}":`, error);
    }
  });
};
