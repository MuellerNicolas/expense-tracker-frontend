it('eingabe test', () => {
  //Visit the view Budget on the website
  cy.visit('/budgets');
  cy.get('#mat-expansion-panel-header-0').click();

  //find the field and fill out
  cy.get('#mat-input-0').clear().type('2000');

  // clicking button for updateing the value
  cy.get('[type=submit]').first().click();
  cy.wait(1000);

  //Reload the homepage to check whether the new value has been saved.
  cy.reload();
  //Open the Category again
  cy.get('#mat-expansion-panel-header-0').click();

  //validate the input field
  cy.get('#mat-input-0').should('have.value', '2000');
});
