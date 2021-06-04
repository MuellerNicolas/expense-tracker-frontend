describe('Budgets E2E Test', () => {
  beforeEach(() => {
    // Define Intercept for the Budget Data
    cy.intercept('api/budgets/', { fixture: 'budgets' }).as('getBudgets');
    // Visit the view Budget on the website
    cy.visit('/budgets');
    // wait for the intercepted data anwser
    cy.wait(['@getBudgets']);
  });

  it('eingabe test', () => {
    // commands below are waiting till the call is ready / data is present
    cy.get('#mat-expansion-panel-header-0').click();

    // find the field and fill out
    cy.get('#mat-input-0').clear().type('2000');

    cy.intercept('api/budgets/1', 'success').as('update');

    // clicking button for updating the value
    cy.get('[type=submit]').first().click();

    cy.wait('@update')
      .its('response.statusCode')
      .should('eq', 200) // 200 OK;
      .its('request.body')
      .should('include', 'success');

    // validate the input field
    cy.get('#mat-input-0').should('have.value', '2000');
  });
});
