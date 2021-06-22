class AusgabenPage {
  constructor() {}

  visit() {
    cy.visit('/ausgaben');
  }
  getAddExpenseDatePicker() {
    return cy.get('[type=button]').first();
  }

  getAddExpenseNameField() {
    return cy.get('#mat-input-1');
  }

  getAddExpenseBetragField() {
    return cy.get('#mat-input-2');
  }

  getAddExpenseKategorieSelect() {
    return cy.get('#mat-select-0');
  }

  getAddExpenseSubmitButton() {
    return cy.get('[type=submit]').first();
  }

  getAddExpenseKategorieOption(id: number) {
    return cy.get('#mat-option-' + id.toString());
  }

  selectDateInAddExpenseDatePicker(date: string) {
    return cy.contains(date);
  }
}

export default AusgabenPage;
