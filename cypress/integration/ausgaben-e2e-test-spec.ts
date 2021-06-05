describe('Eingaben E2E Test', () => {
  beforeEach(() => {
    // Define Intercept for the Ausgabe Data
    cy.intercept('api/ausgaben/', { fixture: 'ausgaben' }).as('getAusgaben');
    // Visit the view Ausgabe on the website
    cy.visit('/ausgaben');
    // wait for the intercepted data anwser
    cy.wait(['@getAusgaben']);
  });
  it('neueAusgabe test', () => {
    //click the date picker
    cy.get('[type=button]').first().click();
    //choose date 15
    cy.contains('15').click();
    // find the other fields and fill out
    cy.get('#mat-input-1').type('Pizza essen');
    cy.get('#mat-input-2').type('40');
    cy.get('#mat-select-0').click();
    cy.get('#mat-option-2').click();
    cy.intercept('POST', '/ausgaben/').as('new-expense');
    cy.get('[type=submit]').first().click();
    //confirm outgoing request
    /*cy.get('@new-expense').its('request.body').should('deep.equal', {
      id: 4,
      name: 'Pizza essen',
      betrag: 40,
      waehrung: '€',
      kategorie: 'Essen und Trinken',
      datum: 'June 15, 2021',
    });*/
  });
});
