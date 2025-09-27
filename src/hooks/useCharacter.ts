import { useState, useCallback, useEffect, useRef } from 'react';
import type { Character, Position, Direction, AvatarType } from '../types';
import { useColorName } from './useColorName';
import { characterStorage } from '../utils/localStorage';

const DEFAULT_COLOR = '#059669';
const DEFAULT_NAME = 'Hero';

export const useCharacter = () => {
	// Initialize state with values from localStorage
	const [character, setCharacter] = useState<Character>(() => {
		const savedColor = characterStorage?.getColor(DEFAULT_COLOR);
		const savedColorName = characterStorage?.getColorName();
		const savedName = characterStorage?.getName(DEFAULT_NAME);
		const savedAvatarType = characterStorage?.getAvatarType('basic');
		const savedPosition = characterStorage?.getPosition({ x: 10, y: 7 });

		return {
			name: savedName,
			color: savedColor,
			colorName: savedColorName,
			position: savedPosition,
			avatarType: savedAvatarType as AvatarType,
		};
	});

	const { fetchColorName } = useColorName();
	const initializedDefaultColor = useRef(false);

	const updateCharacter = useCallback(<K extends keyof Character>(key: K, value: Character[K]) => {
		setCharacter((prev) => ({ ...prev, [key]: value }));
	}, []);

	const moveCharacter = useCallback((direction: Direction) => {
		setCharacter((prev) => {
			const newPosition: Position = { ...prev.position };

			switch (direction) {
				case 'up':
					newPosition.y = Math.max(0, newPosition.y - 1);
					break;
				case 'down':
					newPosition.y = Math.min(14, newPosition.y + 1); // 15-1
					break;
				case 'left':
					newPosition.x = Math.max(0, newPosition.x - 1);
					break;
				case 'right':
					newPosition.x = Math.min(19, newPosition.x + 1); // 20-1
					break;
			}

			return { ...prev, position: newPosition };
		});
	}, []);

	const resetCharacterPosition = useCallback((shouldReset = true) => {
		if (shouldReset) {
			setCharacter((prev) => ({
				...prev,
				position: { x: 10, y: 7 },
			}));
		}
	}, []);

	// Effect to persist character data to localStorage
	useEffect(() => {
		if (character?.name) {
			characterStorage.setName(character.name);
		}

		if (character?.color) {
			characterStorage.setColor(character.color);
		}

		if (character?.colorName) {
			characterStorage.setColorName(character.colorName);
		}

		if (character?.avatarType) {
			characterStorage.setAvatarType(character.avatarType);
		}

		if (character?.position) {
			characterStorage.setPosition(character.position);
		}
	}, [character]);

	useEffect(() => {
		const initializeDefaultColorName = async () => {
			if (character?.color === DEFAULT_COLOR && !character?.colorName && !initializedDefaultColor.current) {
				initializedDefaultColor.current = true;
				const colorName = await fetchColorName(DEFAULT_COLOR);
				if (colorName) {
					setCharacter((prev) => ({ ...prev, colorName }));
				}
			}

			if (character?.color !== DEFAULT_COLOR) {
				initializedDefaultColor.current = false;
			}
		};

		initializeDefaultColorName();
	}, [character?.color, character?.colorName, fetchColorName]);

	return {
		character,
		updateCharacter,
		moveCharacter,
		resetCharacterPosition,
		defaultColor: DEFAULT_COLOR,
	};
};
