/// <reference types="cypress" />
import '../support/commands';

declare global {
	namespace Cypress {
		interface Chainable {
			moveCharacter(direction: 'up' | 'down' | 'left' | 'right', times?: number): Chainable<void>;
		}
	}
}

describe('Map Functionality', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('should display map container and character', () => {
		cy.get('[data-testid="game-map"]').should('be.visible');
		cy.get('[data-testid="character"]').should('be.visible');
		cy.get('body').then(($body) => {
			if ($body.find('.leaflet-container').length > 0) {
				cy.get('.leaflet-container').should('be.visible');
			} else if ($body.find('canvas').length > 0) {
				cy.get('canvas').should('be.visible');
			} else if ($body.find('img').length > 0) {
				cy.get('img').should('be.visible');
			}
		});
	});

	it('should handle map theme switching', () => {
		cy.get('[data-testid="map-selector"]').should('exist');
		cy.get('body').then(($body) => {
			const themeButtons = $body.find('[data-testid^="map-theme-"]');
			if (themeButtons.length > 1) {
				Array.from({ length: Math.min(themeButtons.length, 3) }, (_, i) => {
					cy.get('[data-testid^="map-theme-"]').eq(i).click();
					cy.wait(500);
					cy.get('[data-testid="game-map"]').should('be.visible');
					cy.get('[data-testid="character"]').should('be.visible');
				});
			}
		});
	});

	it('should handle address search if available', () => {
		cy.get('body').then(($body) => {
			const addressInput = $body.find(
				'input[placeholder*="address"], input[placeholder*="city"], input[placeholder*="place"]',
			);

			if (addressInput.length > 0) {
				cy.wrap(addressInput.first()).type('Warsaw, Poland');
				const searchBtn = $body.find('button:contains("Search"), button:contains("search")');
				if (searchBtn.length > 0) {
					cy.wrap(searchBtn.first()).click();
					cy.get('[data-testid="search-result"], [class*="search-result"]', { timeout: 10000 }).should('exist');
				}
			}
		});
	});

	it('should update character position visually on movement', () => {
		cy.get('[data-testid="character"]')
			.should('be.visible')
			.then(($char) => {
				const initialRect = $char[0].getBoundingClientRect();

				cy.moveCharacter('right', 3);
				cy.moveCharacter('down', 2);
				cy.wait(300);
				cy.wrap($char).then(($newChar) => {
					const newRect = $newChar[0].getBoundingClientRect();
					const positionChanged = newRect.left !== initialRect.left || newRect.top !== initialRect.top;
					void expect(positionChanged).to.be.true;
				});
			});
	});

	it('should display position information if available', () => {
		cy.get('body').then(($body) => {
			const positionDisplay = $body.find('[data-testid="position"], [class*="position"]');

			if (positionDisplay.length > 0) {
				cy.wrap(positionDisplay.first()).should('be.visible').invoke('text').as('initialPosition');
				cy.moveCharacter('up', 1);
				cy.moveCharacter('left', 1);
				cy.wait(200);
				cy.wrap(positionDisplay.first())
					.invoke('text')
					.then((newText) => {
						cy.get('@initialPosition').then((initialText) => {
							expect(newText).to.not.equal(initialText);
						});
					});
			}
		});
	});

	it('should handle map type badges if available', () => {
		cy.get('body').then(($body) => {
			const badges = $body.find('[data-testid="map-badge"], [class*="badge"]');
			if (badges?.length > 0) {
				cy.wrap(badges?.first()).should('be.visible');
				cy.wrap(badges.first()).invoke('text').should('not.be.empty');
			}
		});
	});

	it('should maintain map functionality after window resize', () => {
		cy.viewport(1200, 800);
		cy.wait(500);
		cy.get('[data-testid="game-map"]').should('be.visible');
		cy.get('[data-testid="character"]').should('be.visible');
		cy.moveCharacter('right', 2);
		cy.get('[data-testid="character"]').should('be.visible');
		cy.viewport(1280, 720);
	});

	it('should handle grid toggle if available', () => {
		cy.get('body').then(($body) => {
			const checkboxes = $body.find('input[type="checkbox"]');
			const gridToggle = checkboxes.filter((i, el) => Cypress.$(el).parent().text().toLowerCase().includes('grid'));

			if (gridToggle.length > 0) {
				cy.wrap(gridToggle.first()).check();
				cy.wait(500);
				cy.get('[data-testid="game-map"], [class*="game-map"]').should('be.visible');
				cy.wrap(gridToggle.first()).uncheck();
				cy.wait(500);
				cy.get('[data-testid="game-map"], [class*="game-map"]').should('be.visible');
			}
		});
	});
});
