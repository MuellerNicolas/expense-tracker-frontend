describe('Ausgaben E2E Test', () => {
  beforeEach(() => {
    // Define Intercept for the Ausgabe Data
    cy.intercept('GET', 'api/ausgaben/', { fixture: 'ausgaben' }).as(
      'getAusgaben'
    );
    cy.intercept('GET', 'api/budgets/', { fixture: 'budgets' }).as(
      'getBudgets'
    );
    // Visit the view Ausgabe on the website
    cy.visit('/ausgaben');
    // wait for the intercepted data anwser
    cy.wait(['@getAusgaben', '@getBudgets']);
  });
  it('should add new Expense', () => {
    //click the date picker
    cy.get('[type=button]').first().click();
    //choose date 15
    cy.contains('15').click();
    // find the other fields and fill out
    cy.get('#mat-input-1').type('Pizza essen');
    cy.get('#mat-input-2').type('40');
    cy.get('#mat-select-0').click();
    cy.get('#mat-option-2').click();
    // static date
    cy.intercept('POST', 'api/ausgaben/', (req) => {
      req.body.datum = '2021-06-14T22:00:00.000Z';
    }).as('newExpenseRequest');
    // submit
    cy.get('[type=submit]').first().click();
    // check outgoing request
    cy.get('@newExpenseRequest').its('request.body').should('deep.equal', {
      userId: '1',
      name: 'Pizza essen',
      betrag: 40,
      kategorie: 'Essen und Trinken',
      datum: '2021-06-14T22:00:00.000Z',
    });
  });
});
