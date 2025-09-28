import { renderHook } from '@testing-library/react';
import { useKeyboard } from '../useKeyboard';

describe('useKeyboard', () => {
	let mockOnMove: jest.Mock;

	beforeEach(() => {
		mockOnMove = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should call onMove with correct direction on arrow key press', () => {
		renderHook(() => useKeyboard(mockOnMove));

		const upEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
		const preventDefaultSpy = jest.spyOn(upEvent, 'preventDefault');
		window.dispatchEvent(upEvent);

		expect(mockOnMove).toHaveBeenCalledWith('up');
		expect(preventDefaultSpy).toHaveBeenCalled();

		mockOnMove.mockClear();

		const downEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
		window.dispatchEvent(downEvent);
		expect(mockOnMove).toHaveBeenCalledWith('down');

		mockOnMove.mockClear();
		const leftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
		window.dispatchEvent(leftEvent);
		expect(mockOnMove).toHaveBeenCalledWith('left');

		mockOnMove.mockClear();
		const rightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
		window.dispatchEvent(rightEvent);
		expect(mockOnMove).toHaveBeenCalledWith('right');
	});

	it('should not call onMove for non-arrow keys', () => {
		renderHook(() => useKeyboard(mockOnMove));

		const events = [
			new KeyboardEvent('keydown', { key: 'a' }),
			new KeyboardEvent('keydown', { key: 'Enter' }),
			new KeyboardEvent('keydown', { key: 'Space' }),
			new KeyboardEvent('keydown', { key: 'Escape' }),
		];

		events.forEach((event) => {
			window.dispatchEvent(event);
		});

		expect(mockOnMove).not.toHaveBeenCalled();
	});

	it('should prevent default behavior for arrow keys only', () => {
		renderHook(() => useKeyboard(mockOnMove));

		const arrowEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
		const arrowPreventDefaultSpy = jest.spyOn(arrowEvent, 'preventDefault');
		window.dispatchEvent(arrowEvent);

		expect(arrowPreventDefaultSpy).toHaveBeenCalled();

		const otherEvent = new KeyboardEvent('keydown', { key: 'a' });
		const otherPreventDefaultSpy = jest.spyOn(otherEvent, 'preventDefault');
		window.dispatchEvent(otherEvent);

		expect(otherPreventDefaultSpy).not.toHaveBeenCalled();
	});

	it('should remove event listener on unmount', () => {
		const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
		const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

		const { unmount } = renderHook(() => useKeyboard(mockOnMove));

		expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

		unmount();

		expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

		addEventListenerSpy.mockRestore();
		removeEventListenerSpy.mockRestore();
	});

	it('should update handler when onMove changes', () => {
		const firstHandler = jest.fn();
		const secondHandler = jest.fn();

		const { rerender } = renderHook(({ handler }) => useKeyboard(handler), {
			initialProps: { handler: firstHandler },
		});

		const event1 = new KeyboardEvent('keydown', { key: 'ArrowUp' });
		window.dispatchEvent(event1);

		expect(firstHandler).toHaveBeenCalledWith('up');
		expect(secondHandler).not.toHaveBeenCalled();

		rerender({ handler: secondHandler });

		const event2 = new KeyboardEvent('keydown', { key: 'ArrowDown' });
		window.dispatchEvent(event2);

		expect(secondHandler).toHaveBeenCalledWith('down');

		expect(firstHandler).toHaveBeenCalledTimes(1);
	});
});
