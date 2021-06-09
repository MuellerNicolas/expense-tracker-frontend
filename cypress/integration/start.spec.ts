it('smoke test', () => {
  cy.visit('/');
  cy.contains('Expense-Tracker');
});
