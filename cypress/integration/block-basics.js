import { setupBeforeEach, tearDownAfterEach } from '../support';

describe('Blocks Tests', () => {
  beforeEach(setupBeforeEach);
  afterEach(tearDownAfterEach);

  it('Add Block: Empty', () => {
    // without this the clear command below does nothing sometimes
    cy.wait(500);

    // Change page title
    cy.get('[contenteditable=true]').first().clear();

    cy.get('[contenteditable=true]').first().type('My Add-on Page');

    cy.get('.documentFirstHeading').contains('My Add-on Page');

    cy.get('[contenteditable=true]').first().type('{enter}');

    // Add block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Media').click();
    cy.get('.content.active.media .button.image').contains('Image').click();

    cy.get('.open-styles-button button').click();
    cy.get('.accordion.ui.fluid.styled').contains('Standard').click();
    cy.get('.align-tools').first().click();
    cy.get('#field-fontSize').click();
    cy.get('.react-select__menu').contains('medium').click();
    cy.get('.field-wrapper-align button').eq(1).click();
    cy.get('.field-wrapper-stretch button').eq(1).click();
    cy.get('.field-wrapper-size button').first().click();

    cy.get('.accordion.ui.fluid.styled').contains('Decorations').click();
    cy.get('.simple-color-picker-widget button').first().click();
    cy.get('.github-picker.color-picker span').eq(4).click();
    cy.wait(1000);
    cy.get('.simple-color-picker-widget button').eq(2).click();
    cy.get('.github-picker.color-picker span').eq(8).click();
    cy.wait(1000);
    cy.get('.simple-color-picker-widget button').eq(3).click();
    cy.get('.simple-color-picker-widget button').eq(4).click();
    cy.get('.github-picker.color-picker span').eq(8).click();

    cy.get('.slider-widget-wrapper .slider-knob')
      .first()
      .trigger('mousedown', { which: 1 }, { force: true })
      .trigger('mousemove', 70, 0, { force: true })
      .trigger('mouseup');
    cy.get('.slider-widget-wrapper .slider-knob')
      .eq(1)
      .trigger('mousedown', { which: 1 }, { force: true })
      .trigger('mousemove', 70, 0, { force: true })
      .trigger('mouseup');

    // Save
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    // then the page view should contain our changes
    cy.contains('My Add-on Page');
    cy.get('.block.image');
  });
});
