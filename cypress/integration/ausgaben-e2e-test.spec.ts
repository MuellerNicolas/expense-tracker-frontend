import AusgabenPage from '../page-objects/ausgaben-page';

describe('Ausgaben E2E Test', () => {
  beforeEach(() => {
    // Define Intercept for the Ausgabe Data
    cy.intercept('GET', 'api/ausgaben/', { fixture: 'ausgaben' }).as(
      'getAusgaben'
    );
    cy.intercept('GET', 'api/budgets/', { fixture: 'budgets' }).as(
      'getBudgets'
    );

    // Page Object
    const ausgabenPage = new AusgabenPage();

    // Visit the view Ausgabe on the website
    ausgabenPage.visit();

    // wait for the intercepted data anwser
    cy.wait(['@getAusgaben', '@getBudgets']);
  });

  it('should add new expense', () => {
    const ausgabenPage = new AusgabenPage();
    // click the date picker
    ausgabenPage.getAddExpenseDatePicker().click();

    // choose date 14
    ausgabenPage.selectDateInAddExpenseDatePicker('14').click();

    // find the other fields and fill out
    ausgabenPage.getAddExpenseNameField().type('Pizza essen');
    ausgabenPage.getAddExpenseBetragField().type('40');
    ausgabenPage.getAddExpenseKategorieSelect().click();
    ausgabenPage.getAddExpenseKategorieOption(2).click();

    cy.intercept('POST', 'api/ausgaben/').as('newExpenseRequest');

    // submit
    ausgabenPage.getAddExpenseSubmitButton().click();

    // check request
    cy.wait('@newExpenseRequest').should(({ request }) => {
      // check if the request aims at the correct collection
      expect(request.url).include('/api/ausgaben/');
      // check if the request executes the right http method
      expect(request.method).to.deep.equal('POST');
      // check if the request body is as expected
      expect(request.body).to.deep.equal({
        userId: '1',
        name: 'Pizza essen',
        betrag: 40,
        kategorie: 'Essen und Trinken',
        datum: '2021-06-14T00:00:00.000Z',
      });
    });
  });

  it('should not add new expense with missing field', () => {
    const ausgabenPage = new AusgabenPage();
    // click the date picker
    ausgabenPage.getAddExpenseDatePicker().click();
    // choose date 15
    ausgabenPage.selectDateInAddExpenseDatePicker('15').click();
    // don't input all fields
    ausgabenPage.getAddExpenseBetragField().type('40');
    ausgabenPage.getAddExpenseKategorieSelect().click();
    ausgabenPage.getAddExpenseKategorieOption(2).click();
    ausgabenPage.getAddExpenseSubmitButton().should('be.disabled');
  });

  it('should not add new expense with a negative "betrag" value', () => {
    const ausgabenPage = new AusgabenPage();
    // click the date picker
    ausgabenPage.getAddExpenseDatePicker().click();
    // choose date 15
    ausgabenPage.selectDateInAddExpenseDatePicker('15').click();
    // find the other fields and fill out with negative betrag
    ausgabenPage.getAddExpenseNameField().type('Pizza essen');
    ausgabenPage.getAddExpenseBetragField().type('-40');
    ausgabenPage.getAddExpenseKategorieSelect().click();
    ausgabenPage.getAddExpenseKategorieOption(2).click();
    ausgabenPage.getAddExpenseSubmitButton().should('be.disabled');
  });

  it('should update an existing expense', () => {
    cy.get('#mat-expansion-panel-header-1').click();

    // change value at date field
    cy.get('[type=button]').eq(1).click();
    cy.contains('25').click();

    // change value of name
    cy.get('#mat-input-4').clear().type('Bahnticket');

    // change value of amount
    cy.get('#mat-input-5').clear().type('20');

    // change category
    cy.get('#mat-select-2').click();
    cy.get('#mat-option-14').click();

    cy.intercept('PUT', 'api/ausgaben/*').as('update');

    // update
    cy.get('[type=submit]').eq(1).click();

    cy.wait('@update').should(({ request }) => {
      expect(request.url).include('/api/ausgaben/60c0f25e698a3d5c99652925');
      expect(request.method).to.deep.equal('PUT');
      expect(request.body).to.deep.equal({
        userId: '1',
        name: 'Bahnticket',
        betrag: 20,
        expenseId: '60c0f25e698a3d5c99652925',
        kategorie: 'Mobilität',
        datum: '1995-12-25T00:00:00.000Z',
      });
    });
    cy.get('#mat-expansion-panel-header-1').click();

    // validate the input field
    cy.get('#mat-input-5').should('have.value', '20');
  });

  it('should not update an existing expense with missing fields', () => {
    cy.get('#mat-expansion-panel-header-1').click();
    cy.get('#mat-input-5').clear();
    cy.get('#mat-input-4').click();
    cy.get('[type=submit]').eq(1).should('be.disabled');
  });

  it('should not update an existing expense with a negative "betrag" value', () => {
    cy.get('#mat-expansion-panel-header-1').click();
    cy.get('#mat-input-5').clear().type('-30');
    cy.get('#mat-input-4').click();
    cy.get('[type=submit]').eq(1).should('be.disabled');
  });

  it('should delete an expense', () => {
    cy.get('#mat-expansion-panel-header-1').click();
    cy.intercept('DELETE', 'api/ausgaben/*').as('delete');
    cy.contains('Löschen').eq(0).click();

    cy.wait('@delete').should(({ request }) => {
      expect(request.url).include('/api/ausgaben/60c0f25e698a3d5c99652925');
      expect(request.method).to.deep.equal('DELETE');
    });
    // validate
    cy.get('#mat-expansion-panel-header-1').should('not.exist');
  });

  it('should display a field for adding new expenses and the last 3 expenses', () => {
    cy.get('.mat-expansion-panel').should('have.length', 4);
  });
});
