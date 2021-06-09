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

  it('should add new expense', () => {
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

    // check request
    cy.wait('@newExpenseRequest').should(({ request, response }) => {
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
        datum: '2021-06-14T22:00:00.000Z',
      });
    });
  });

  it('should not add new expense with missing field', () => {
    //click the date picker
    cy.get('[type=button]').first().click();
    //choose date 15
    cy.contains('15').click();
    // don't input all fields
    cy.get('#mat-input-2').type('40');
    cy.get('#mat-select-0').click();
    cy.get('#mat-option-2').click();
    cy.get('[type=submit]').first().should('be.disabled');
  });

  it('should not add new expense with a negative "betrag" value', () => {
    //click the date picker
    cy.get('[type=button]').first().click();
    //choose date 15
    cy.contains('15').click();
    // find the other fields and fill out with negative betrag
    cy.get('#mat-input-1').type('Pizza essen');
    cy.get('#mat-input-2').type('-40');
    cy.get('#mat-select-0').click();
    cy.get('#mat-option-2').click();
    cy.get('[type=submit]').first().should('be.disabled');
  });

  it('should update an existing expense', () => {
    cy.get('#mat-expansion-panel-header-1').click();
    cy.get('#mat-input-5').clear().type('20');

    cy.intercept('PUT', 'api/ausgaben/*', (req) => {
      req.body.datum = '2021-06-14T22:00:00.000Z';
    }).as('update');

    //update
    cy.get('[type=submit]').eq(1).click();

    cy.wait('@update').should(({ request, response }) => {
      expect(request.url).include('/api/ausgaben/60c0f25e698a3d5c99652925');
      expect(request.method).to.deep.equal('PUT');
      expect(request.body).to.deep.equal({
        userId: '1',
        name: 'Wein',
        betrag: 20,
        expenseId: '60c0f25e698a3d5c99652925',
        kategorie: 'Essen und Trinken',
        datum: '2021-06-14T22:00:00.000Z',
      });
    });
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

    cy.wait('@delete').should(({ request, response }) => {
      expect(request.url).include('/api/ausgaben/60c0f25e698a3d5c99652925');
      expect(request.method).to.deep.equal('DELETE');
    });
  });
});
