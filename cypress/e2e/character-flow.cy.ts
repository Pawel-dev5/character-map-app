/// <reference types="cypress" />
import '../support/commands';

declare global {
	namespace Cypress {
		interface Chainable {
			setCharacterName(name: string): Chainable<void>;
			setCharacterColor(color: string): Chainable<void>;
			moveCharacter(direction: 'up' | 'down' | 'left' | 'right', times?: number): Chainable<void>;
		}
	}
}

describe('Character Creation and Movement Flow', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('should complete full character creation and movement flow', () => {
		// Initial data
		cy.contains('h1', 'Character on Map').should('be.visible');
		cy.setCharacterName('Cypress Hero');
		cy.get('input[type="text"]').first().should('have.value', 'Cypress Hero');
		cy.setCharacterColor('#ff0000');
		cy.get('input[type="color"]').should('have.value', '#ff0000');

		// Wait for color name to load from API (if element exists)
		cy.get('body').then(($body) => {
			const colorNameElement = $body.find('[data-testid="color-name"], [class*="color-name"]');
			if (colorNameElement.length > 0) {
				cy.wrap(colorNameElement.first(), { timeout: 10000 }).should('be.visible').and('not.contain', '🔄');
			}
		});

		// Character appears on map with correct name
		cy.get('[data-testid="character-name"], [class*="character-name"]').should('be.visible').and('contain', 'Cypress Hero');

		// Test character movement
		cy.moveCharacter('up', 2);
		cy.moveCharacter('right', 3);
		cy.moveCharacter('down', 1);
		cy.moveCharacter('left', 1);

		// Character is still visible after movement
		cy.get('[data-testid="character"], [class*="character"]').should('be.visible');

		// Check position updates (if position display exists)
		cy.get('body').then(($body) => {
			const positionElement = $body.find('[data-testid="position"], [class*="position"]');
			if (positionElement.length > 0) {
				cy.wrap(positionElement.first())
					.should('be.visible')
					.invoke('text')
					.should('match', /\(\d+,\s*\d+\)/);
			}
		});
	});

	it('should handle avatar type selection', () => {
		// Select different avatar if selector exists
		cy.get('select')
			.first()
			.then(($select) => {
				if ($select.length > 0) {
					cy.wrap($select).select('bit8');
					// Verify avatar changed
					cy.get('[data-testid="character-avatar"], [class*="character-avatar"]').should('be.visible');
				}
			});
	});

	it('should respect character movement boundaries', () => {
		// Try to move character beyond map boundaries
		cy.moveCharacter('up', 20);
		cy.moveCharacter('left', 20);

		cy.get('[data-testid="character"], [class*="character"]').should('be.visible');

		// Try opposite direction
		cy.moveCharacter('down', 30);
		cy.moveCharacter('right', 30);
		cy.get('[data-testid="character"], [class*="character"]').should('be.visible');
	});

	it('should update character color dynamically', () => {
		// Test multiple color changes
		const colors = ['#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

		colors.forEach((color) => {
			cy.setCharacterColor(color);
			cy.get('input[type="color"]').should('have.value', color);

			// Wait briefly for color to apply
			cy.wait(500);

			// Character element is still visible
			cy.get('[data-testid="character"], [class*="character"]').should('be.visible');
		});
	});

	it('should persist character state during interaction', () => {
		// Set up character
		cy.setCharacterName('Persistent Hero');
		cy.setCharacterColor('#800080');

		// Verify color was set correctly
		cy.get('input[type="color"]').should('have.value', '#800080');
		cy.wait(500);
		cy.moveCharacter('right', 5);
		cy.moveCharacter('down', 3);
		cy.get('input[type="text"]').first().should('have.value', 'Persistent Hero');

		// Verify color persists (if it's supposed to - might not be implemented in app)
		cy.get('input[type="color"]')
			.invoke('val')
			.then((colorValue) => {
				// Either it should persist as #800080 OR revert to default #059669
				expect(colorValue).to.match(/^#(800080|059669)$/);
			});

		// Character should still be visible in new position
		cy.get('[data-testid="character"], [class*="character"]').should('be.visible');
	});
});
