class BudgetPage {
  constructor() {}

  visit() {
    cy.visit('/budgets');
  }

  getBudgetPanel(budgetNumber: number) {
    return cy.get('#mat-expansion-panel-header-' + budgetNumber.toString());
  }

  getBetragInputField() {
    return cy.get('#mat-input-0');
  }

  getSubmitField() {
    return cy.get('[type=submit]').first();
  }

  getAllBudgets() {
    return cy.get('.mat-expansion-panel');
  }
}

export default BudgetPage;
