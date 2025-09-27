import { useEffect } from "react";
import type { Direction } from "../types";

type KeyboardHandler = (direction: Direction) => void;

export const useKeyboard = (onMove: KeyboardHandler) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event?.key) {
        case "ArrowUp":
          event?.preventDefault();
          onMove("up");
          break;
        case "ArrowDown":
          event?.preventDefault();
          onMove("down");
          break;
        case "ArrowLeft":
          event?.preventDefault();
          onMove("left");
          break;
        case "ArrowRight":
          event?.preventDefault();
          onMove("right");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [onMove]);
};
