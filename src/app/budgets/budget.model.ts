export class Budget {
  budgetId?: string;
  budget?: number;
  kategorie?: string;

  constructor(budgetId?: string, budget?: number, kategorie?: string) {
    this.budgetId = budgetId;
    this.budget = budget;
    this.kategorie = kategorie;
  }
}
