import { renderHook, act } from '@testing-library/react';
import { useCharacter } from '../useCharacter';
import type { AvatarType } from '../../types';

jest.mock('../../utils/localStorage', () => ({
	characterStorage: {
		getColor: jest.fn(() => '#059669'),
		getColorName: jest.fn(() => null),
		getName: jest.fn(() => 'Hero'),
		getAvatarType: jest.fn(() => 'basic'),
		getPosition: jest.fn(() => ({ x: 10, y: 7 })),
		setColor: jest.fn(),
		setColorName: jest.fn(),
		setName: jest.fn(),
		setAvatarType: jest.fn(),
		setPosition: jest.fn(),
	},
}));

jest.mock('../useColorName', () => ({
	useColorName: () => ({
		fetchColorName: jest.fn(),
		loading: false,
		error: null,
		clearError: jest.fn(),
	}),
}));

describe('useCharacter', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should initialize with default character values', () => {
		const { result } = renderHook(() => useCharacter());

		expect(result.current.character).toEqual({
			name: 'Hero',
			color: '#059669',
			colorName: null,
			position: { x: 10, y: 7 },
			avatarType: 'basic',
		});
	});

	describe('updateCharacter', () => {
		it('should update character name', () => {
			const { result } = renderHook(() => useCharacter());

			act(() => {
				result.current.updateCharacter('name', 'New Hero');
			});

			expect(result.current.character?.name).toBe('New Hero');
		});

		it('should update character color', () => {
			const { result } = renderHook(() => useCharacter());

			act(() => {
				result.current.updateCharacter('color', '#ff0000');
			});

			expect(result.current.character?.color).toBe('#ff0000');
		});

		it('should update avatar type', () => {
			const { result } = renderHook(() => useCharacter());

			act(() => {
				result.current.updateCharacter('avatarType', 'bit8' as AvatarType);
			});

			expect(result.current.character?.avatarType).toBe('bit8');
		});
	});

	describe('moveCharacter', () => {
		it('should move character up', () => {
			const { result } = renderHook(() => useCharacter());

			act(() => {
				result.current.moveCharacter('up');
			});

			expect(result.current.character?.position.y).toBe(6);
			expect(result.current.character?.position.x).toBe(10);
		});

		it('should move character down', () => {
			const { result } = renderHook(() => useCharacter());

			act(() => {
				result.current.moveCharacter('down');
			});

			expect(result.current.character?.position.y).toBe(8);
			expect(result.current.character?.position.x).toBe(10);
		});

		it('should move character left', () => {
			const { result } = renderHook(() => useCharacter());

			act(() => {
				result.current.moveCharacter('left');
			});

			expect(result.current.character?.position.x).toBe(9);
			expect(result.current.character?.position.y).toBe(7);
		});

		it('should move character right', () => {
			const { result } = renderHook(() => useCharacter());

			act(() => {
				result.current.moveCharacter('right');
			});

			expect(result.current.character?.position.x).toBe(11);
			expect(result.current.character?.position.y).toBe(7);
		});

		it('should not move beyond boundaries', () => {
			const { result } = renderHook(() => useCharacter());

			act(() => {
				Array.from({ length: 15 }, () => {
					result.current.moveCharacter('up');
					result.current.moveCharacter('left');
				});
			});

			expect(result.current.character?.position.x).toBe(0);
			expect(result.current.character?.position.y).toBe(0);

			act(() => {
				result.current.moveCharacter('up');
				result.current.moveCharacter('left');
			});

			expect(result.current.character?.position.x).toBe(0);
			expect(result.current.character?.position.y).toBe(0);

			act(() => {
				Array.from({ length: 25 }, () => {
					result.current.moveCharacter('down');
					result.current.moveCharacter('right');
				});
			});

			expect(result.current.character?.position.x).toBe(19);
			expect(result.current.character?.position.y).toBe(14);

			act(() => {
				result.current.moveCharacter('down');
				result.current.moveCharacter('right');
			});

			expect(result.current.character?.position.x).toBe(19);
			expect(result.current.character?.position.y).toBe(14);
		});
	});
});
