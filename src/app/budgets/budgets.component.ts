import { Component, OnInit } from '@angular/core';
import { Budget } from './budget.model';
import { BudgetsService } from './budgets.service';

@Component({
  selector: 'budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss'],
})
export class BudgetsComponent implements OnInit {
  budgets: Budget[] = [];

  constructor(private budgetsService: BudgetsService) {}

  ngOnInit(): void {
    this.getBudgets();
  }

  getBudgets(): void {
    this.budgetsService.getBudgets().subscribe((budgets) => {
      this.budgets = budgets;
      // Nach Kategorie alphabetisch ordnen
      this.budgets.sort((a: Budget, b: Budget) =>
        a.kategorie!.localeCompare(b.kategorie!)
      );
    });
  }

  update(budget: Budget): void {
    if (!budget) return;
    this.budgetsService.updateBudget(budget).subscribe();
  }

  getErrorMessage(formField: any) {
    if (formField.hasError('required')) return 'Pflichtfeld';

    if (
      formField.hasError('min') &&
      formField.control.errors.min.actual < formField.control.errors.min.min
    ) {
      return 'Der Wert darf nicht negativ sein';
    } else return '';
  }
}
