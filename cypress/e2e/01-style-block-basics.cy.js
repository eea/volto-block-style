import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Blocks Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Style Block', () => {
    // Change page title
    cy.get('[contenteditable=true]').first().click();

    cy.get('[contenteditable=true]').first().clear();

    cy.get('[contenteditable=true]').first().type('Volto Style Block Demo');

    cy.get('.documentFirstHeading').contains('Volto Style Block Demo');

    // Align the block
    cy.get('.open-styles-button button').click();
    cy.contains('Standard').click();
    cy.get(
      '.inline.field.align-widget.field-wrapper-textAlign .align-buttons .ui.buttons',
    )
      .eq(2)
      .click();

    // Change the background color of the block
    cy.contains('Decorations').click();
    cy.get(
      '.inline.field.simple-color-picker-widget.field-wrapper-backgroundColor .ui.huge.button',
    ).click();
    cy.get('.github-picker.color-picker div[title="#9dc6d4"]').click();

    cy.get(
      '.inline.field.field-wrapper-shadowDepth .slider-widget-wrapper .slider-knob.single',
    ).dblclick();
    cy.get(
      '.inline.field.field-wrapper-shadowDepth .slider-widget-wrapper input',
    ).type('3{enter}');

    cy.get(
      '.inline.field.field-wrapper-shadowDepth .slider-widget-wrapper .slider-knob.single',
    ).trigger('mousedown', { which: 1 });
    cy.get(
      '.inline.field.field-wrapper-shadowDepth .slider-widget-wrapper .semantic_ui_range_inner',
    )
      .trigger('mousemove', { clientX: 500 })
      .trigger('mouseup');

    cy.get('[contenteditable=true]').first().type('{enter}');

    // Save page
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    // The page view should contain our changes
    cy.contains('Volto Style Block Demo');
    cy.get('.has--backgroundColor--9dc6d4.has--textAlign--center').should(
      'exist',
    );
  });
});
