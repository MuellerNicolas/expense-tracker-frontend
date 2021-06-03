export class Budget {
  budgetId?: number;
  budget?: number;
  kategorie?: string;

  constructor(budgetId?: number, budget?: number, kategorie?: string) {
    this.budgetId = budgetId;
    this.budget = budget;
    this.kategorie = kategorie;
  }
}
