class AusgabenPage {
  constructor() {}

  visit() {
    cy.visit('/ausgaben');
  }

  getAllPanels() {
    return cy.get('.mat-expansion-panel');
  }

  // Methods concerning add new Expense (Ausgabe Hinzufügen)
  getAddExpenseDatePicker() {
    return cy.get('[type=button]').first();
  }

  getAddExpenseDateOfPicker(date: string) {
    return cy.contains(date);
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

  getAddExpenseKategorieOption(id: number) {
    return cy.get('#mat-option-' + id.toString());
  }

  getAddExpenseSubmitButton() {
    return cy.get('[type=submit]').first();
  }

  // Methods concerning alter existing Expense (existierende Ausgabe verändern)
  getExistingExpensePanel(panelNumber: number) {
    return cy.get('#mat-expansion-panel-header-' + panelNumber.toString());
  }

  getExistingExpenseDatePicker(panelNumber: number) {
    return cy.get('[type=button]').eq(panelNumber);
  }

  getExistingExpenseDateOfPicker(date: string) {
    return cy.contains(date);
  }

  getExistingExpenseNameField() {
    return cy.get('#mat-input-4');
  }

  getExistingExpenseBetragField() {
    return cy.get('#mat-input-5');
  }

  getExistingExpenseKategorieSelect() {
    return cy.get('#mat-select-2');
  }

  getExistingExpenseKategorieOption(id: number) {
    return cy.get('#mat-option-' + id.toString());
  }

  getExistingExpenseSubmitButton(panelNumber: number) {
    return cy.get('[type=submit]').eq(panelNumber);
  }

  getExistingExpenseDeletetButton(panelNumber: number) {
    // For the delete-Button, the Panel Number is starting with zero
    return cy.contains('Löschen').eq(panelNumber - 1);
  }
}

export default AusgabenPage;
