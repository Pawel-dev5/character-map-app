import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { LanguageSwitcher } from '../LanguageSwitcher';

// Mock react-i18next
const mockChangeLanguage = jest.fn();

jest.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: jest.fn((key: string, options?: any) => {
			const translations: Record<string, string> = {
				'language.switchTo': `Switch to ${options?.language}`,
			};
			return translations[key] || key;
		}),
		i18n: {
			changeLanguage: mockChangeLanguage,
			language: 'en',
		},
	}),
}));

describe('LanguageSwitcher', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders language buttons', () => {
		render(<LanguageSwitcher />);

		const enButton = screen.getByRole('button', { name: /switch to english/i });
		const plButton = screen.getByRole('button', { name: /switch to polski/i });

		expect(enButton).toBeInTheDocument();
		expect(plButton).toBeInTheDocument();
		expect(enButton).toHaveTextContent('EN');
		expect(plButton).toHaveTextContent('PL');
	});

	it('shows current language as active', () => {
		render(<LanguageSwitcher />);

		const enButton = screen.getByRole('button', { name: /switch to english/i });
		const plButton = screen.getByRole('button', { name: /switch to polski/i });

		// English should be active by default
		expect(enButton).toHaveClass('active');
		expect(enButton).toHaveAttribute('aria-pressed', 'true');
		expect(plButton).not.toHaveClass('active');
		expect(plButton).toHaveAttribute('aria-pressed', 'false');
	});

	it('switches to Polish when PL button is clicked', async () => {
		const user = userEvent.setup();
		render(<LanguageSwitcher />);

		const plButton = screen.getByRole('button', { name: /switch to polski/i });

		await user.click(plButton);

		expect(mockChangeLanguage).toHaveBeenCalledWith('pl');
	});

	it('switches to English when EN button is clicked', async () => {
		const user = userEvent.setup();

		render(<LanguageSwitcher />);

		const enButton = screen.getByRole('button', { name: /switch to english/i });

		await user.click(enButton);

		expect(mockChangeLanguage).toHaveBeenCalledWith('en');
	});

	it('has proper accessibility attributes', () => {
		render(<LanguageSwitcher />);

		const enButton = screen.getByRole('button', { name: /switch to english/i });
		const plButton = screen.getByRole('button', { name: /switch to polski/i });

		// Check ARIA attributes
		expect(enButton).toHaveAttribute('aria-label', 'Switch to English');
		expect(enButton).toHaveAttribute('aria-pressed', 'true');
		expect(enButton).toHaveAttribute('role', 'button');
		expect(enButton).toHaveAttribute('type', 'button');
		expect(enButton).toHaveAttribute('title', 'Switch to English');

		expect(plButton).toHaveAttribute('aria-label', 'Switch to Polski');
		expect(plButton).toHaveAttribute('aria-pressed', 'false');
		expect(plButton).toHaveAttribute('role', 'button');
		expect(plButton).toHaveAttribute('type', 'button');
		expect(plButton).toHaveAttribute('title', 'Switch to Polski');
	});
});
