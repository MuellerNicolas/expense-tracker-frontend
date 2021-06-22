import BudgetPage from '../page-objects/budget-page';

describe('Budgets E2E Test', () => {
  beforeEach(() => {
    // Define Intercept for the Budget Data
    cy.intercept('GET', 'api/budgets/', { fixture: 'budgets' }).as(
      'getBudgets'
    );
    // Page Object
    const budgetPage = new BudgetPage();

    // Visit the view Budget on the website
    budgetPage.visit();

    // wait for the intercepted data anwser
    cy.wait(['@getBudgets']);
  });

  it('should update a Budget', () => {
    const budgetPage = new BudgetPage();
    // commands below are waiting till the call is ready / data is present
    budgetPage.getBudgetPanel(0).click();

    // find the field and fill out
    budgetPage.getBetragInputField().clear().type('2000');

    cy.intercept('PUT', 'api/budgets/*').as('update');

    // clicking button for updating the value
    budgetPage.getSubmitField().click();

    // confirm outgoing request
    cy.get('@update').its('request.body').should('deep.equal', {
      budget: 2000,
      budgetId: '60b8c2e0e27bd56ec44e30a4',
      kategorie: 'Ausbildung und Studium',
    });

    // validate the input field
    budgetPage.getBetragInputField().should('have.value', '2000');
  });

  it('should not update a budget with an empty betrag', () => {
    const budgetPage = new BudgetPage();
    // open budget
    budgetPage.getBudgetPanel(0).click();
    // clear betrag
    budgetPage.getBetragInputField().clear();
    // validate
    budgetPage.getSubmitField().should('be.disabled');
  });

  it('should not update a budget with a negative "betrag" value', () => {
    const budgetPage = new BudgetPage();
    // open budget
    budgetPage.getBudgetPanel(0).click();
    // enter negative value
    budgetPage.getBetragInputField().clear().type('-30');
    // validate
    budgetPage.getSubmitField().should('be.disabled');
  });

  it('should display all categories', () => {
    const budgetPage = new BudgetPage();
    budgetPage.getAllBudgets().should('have.length', 9);
  });
});
