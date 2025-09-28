/// <reference types="cypress" />

// Custom commands for the character map app
export {};
declare global {
	namespace Cypress {
		interface Chainable {
			/**
			 * Custom command to set character name
			 * @example cy.setCharacterName('Hero')
			 */
			setCharacterName(name: string): Chainable<void>;

			/**
			 * Custom command to set character color
			 * @example cy.setCharacterColor('#ff0000')
			 */
			setCharacterColor(color: string): Chainable<void>;

			/**
			 * Custom command to move character
			 * @example cy.moveCharacter('up', 3)
			 */
			moveCharacter(direction: 'up' | 'down' | 'left' | 'right', times?: number): Chainable<void>;

			/**
			 * Custom command to switch language
			 * @example cy.switchLanguage('pl')
			 */
			switchLanguage(language: 'en' | 'pl'): Chainable<void>;

			/**
			 * Custom command to select map theme
			 * @example cy.selectMapTheme('forest')
			 */
			selectMapTheme(themeName: string): Chainable<void>;

			/**
			 * Wait for color API response
			 */
			waitForColorName(): Chainable<void>;
		}
	}
}

Cypress.Commands.add('setCharacterName', (name: string) => {
	cy.get('input[type="text"]').first().clear().type(name);
});

Cypress.Commands.add('setCharacterColor', (color: string) => {
	cy.get('input[type="color"]').invoke('val', color).trigger('change');
});

Cypress.Commands.add('moveCharacter', (direction: 'up' | 'down' | 'left' | 'right', times = 1) => {
	const key = `Arrow${direction.charAt(0).toUpperCase() + direction.slice(1)}`;
	Array.from({ length: times }, () => {
		cy.get('body').trigger('keydown', { key });
	});
});

Cypress.Commands.add('switchLanguage', (language: 'en' | 'pl') => {
	const buttonText = language === 'en' ? 'EN' : 'PL';
	cy.contains('button', buttonText).click();
});

Cypress.Commands.add('selectMapTheme', (themeName: string) => {
	cy.contains(themeName).click();
});

Cypress.Commands.add('waitForColorName', () => {
	cy.get('[data-cy="color-name"]', { timeout: 10000 }).should('not.contain', '🔄');
});
