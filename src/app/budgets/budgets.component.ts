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
  neueAusgabe: Budget = new Budget();
  kategorien: String[] = ["Essen und Trinken", "Reisen", "Infrastruktur", "Mobilität", "Bekleidung", "Freizeit", "Ausbildung und Studium", "Versicherungen", "Sonstige Ausgaben"];

  constructor() {}

  ngOnInit(): void {
    // nach Datum sortieren
    this.budgets.sort();
  }

  hinzufuegen(ausgabe: Budget) {
    console.log('Hinzufügen:')
    console.log(ausgabe);
    // Hinzufügen und nach Datum sortieren
    this.budgets.push(this.neueAusgabe);
    
    // Hinzufügen-Form resetten
    this.neueAusgabe = new Budget();
  }

  aktualisieren(ausgabe: Budget) {
    console.warn('Aktualisiere:')
    console.log(ausgabe);
    // backend-Aufruf zum Aktualisieren

  }

  loeschen(ausgabe: Budget) {
    console.warn('Lösche:')
    console.log(ausgabe);
    // backend-Aufruf zum Löschen


    // frontend-seitiges löschen
    this.budgets = this.budgets.filter( einzelneAusgabe => einzelneAusgabe.id !== ausgabe.id );
  }

  getErrorMessage(formField: any){
    if(formField.hasError("required")) return "Pflichtfeld";

    if(formField.hasError("min") && formField.control.errors.min.actual < formField.control.errors.min.min) {
      return "Der Wert darf nicht negativ sein";
    }

    else return "";
  }

}
