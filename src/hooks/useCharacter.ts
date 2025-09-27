import { useState, useCallback, useEffect } from "react";
import type { Character, Position, Direction, AvatarType } from "../types";
import { useColorName } from "./useColorName";

const DEFAULT_COLOR = "#059669";
const DEFAULT_NAME = "Hero";

export const useCharacter = () => {
  const [character, setCharacter] = useState<Character>({
    name: DEFAULT_NAME,
    color: DEFAULT_COLOR,
    position: { x: 10, y: 7 },
    avatarType: "basic",
  });

  const { fetchColorName } = useColorName();

  const updateCharacterName = useCallback((name: string) => {
    setCharacter((prev) => ({ ...prev, name }));
  }, []);

  const updateCharacterColor = useCallback((color: string) => {
    setCharacter((prev) => ({ ...prev, color }));
  }, []);

  const updateCharacterColorName = useCallback((colorName: string) => {
    setCharacter((prev) => ({ ...prev, colorName }));
  }, []);

  const updateCharacterAvatarType = useCallback((avatarType: AvatarType) => {
    setCharacter((prev) => ({ ...prev, avatarType }));
  }, []);

  const moveCharacter = useCallback((direction: Direction) => {
    setCharacter((prev) => {
      const newPosition: Position = { ...prev.position };

      switch (direction) {
        case "up":
          newPosition.y = Math.max(0, newPosition.y - 1);
          break;
        case "down":
          newPosition.y = Math.min(14, newPosition.y + 1); // 15-1
          break;
        case "left":
          newPosition.x = Math.max(0, newPosition.x - 1);
          break;
        case "right":
          newPosition.x = Math.min(19, newPosition.x + 1); // 20-1
          break;
      }

      return { ...prev, position: newPosition };
    });
  }, []);

  const resetCharacterPosition = useCallback(() => {
    setCharacter((prev) => ({
      ...prev,
      position: { x: 10, y: 7 },
    }));
  }, []);

  useEffect(() => {
    const initializeDefaultColorName = async () => {
      if (character?.color === DEFAULT_COLOR && !character?.colorName) {
        const colorName = await fetchColorName(DEFAULT_COLOR);
        if (colorName) {
          setCharacter((prev) => ({ ...prev, colorName }));
        }
      }
    };

    initializeDefaultColorName();
  }, [character?.color, character?.colorName, fetchColorName]);

  return {
    character,
    updateCharacterName,
    updateCharacterColor,
    updateCharacterColorName,
    updateCharacterAvatarType,
    moveCharacter,
    resetCharacterPosition,
    defaultColor: DEFAULT_COLOR,
  };
};
