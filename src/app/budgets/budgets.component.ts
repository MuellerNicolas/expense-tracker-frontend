import { Component, OnInit } from '@angular/core';
import { Budget } from '../budget.model';
import { BUDGETS } from './budget-mock';


@Component({
  selector: 'budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss']
})
export class BudgetsComponent implements OnInit {
  budgets: Budget[] = BUDGETS;

  constructor() {}

  ngOnInit(): void {
    // alphabetisch sortieren
    this.budgets.sort((a: Budget, b: Budget) => a.kategorie!.localeCompare(b.kategorie!));
  }

  aktualisieren(budget: Budget) {
    console.warn('Aktualisiere:')
    console.log(budget);
    // backend-Aufruf zum Aktualisieren

  }

  getErrorMessage(formField: any){
    if(formField.hasError("required")) return "Pflichtfeld";

    if(formField.hasError("min") && formField.control.errors.min.actual < formField.control.errors.min.min) {
      return "Der Wert darf nicht negativ sein";
    }

    else return "";
  }

}
