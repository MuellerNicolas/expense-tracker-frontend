import { Component, OnInit } from '@angular/core';
import { Budget } from '../budgets/budget.model';
import { BudgetsService } from '../budgets/budgets.service';
import { Ausgabe } from './ausgabe.model';
import { AusgabenService } from './ausgaben.service';

@Component({
  selector: 'ausgaben',
  templateUrl: './ausgaben.component.html',
  styleUrls: ['./ausgaben.component.scss'],
})
export class AusgabenComponent implements OnInit {
  ausgaben: Ausgabe[] = [];
  neueAusgabe: Ausgabe = new Ausgabe();
  kategorien: String[] = [];

  constructor(
    private ausgabenService: AusgabenService,
    private budgetsService: BudgetsService
  ) {}

  ngOnInit(): void {
    // Ausgaben zum Anzeigen der Liste
    this.getAusgaben();
    // Kategorien zur Auswahl im Formular
    this.getKategorien();
  }

  getAusgaben(): void {
    this.ausgabenService.getAusgaben().subscribe((ausgaben) => {
      this.ausgaben = ausgaben;
      this.ausgaben.forEach(
        (ausgabe) => (ausgabe.datum = new Date(ausgabe.datum!))
      );
      // Nach Datum ordnen
      this.ausgaben.sort(
        (a: Ausgabe, b: Ausgabe) => <any>b.datum - <any>a.datum
      );
    });
  }

  getKategorien(): void {
    this.budgetsService.getBudgets().subscribe((budgets) => {
      budgets.forEach((budget: Budget) =>
        this.kategorien.push(budget.kategorie!)
      );
      // Kategorie alphabetisch ordnen
      this.kategorien.sort();
    });
  }

  add(ausgabe: Ausgabe): void {
    if (!ausgabe) return;
    this.ausgabenService.addAusgabe(ausgabe).subscribe((ausgabe) => {
      // Datum muss neu erzeugt werden, sonst Typ-Fehler wegen TypeScript
      let datum = ausgabe.datum?.toString();
      ausgabe.datum = new Date(datum!);
      // Neue Ausgabe hinzufügen
      this.ausgaben.push(ausgabe);
      // Nach Datum ordnen
      this.ausgaben.sort(
        (a: Ausgabe, b: Ausgabe) => <any>b.datum - <any>a.datum
      );
    });
    // Hinzufügen-Form resetten
    this.neueAusgabe = new Ausgabe();
  }

  update(ausgabe: Ausgabe): void {
    if (!ausgabe) return;
    this.ausgabenService.updateAusgabe(ausgabe).subscribe();
  }

  delete(ausgabe: Ausgabe): void {
    if (!ausgabe.expenseId) return;
    this.ausgabenService.deleteAusgabe(ausgabe.expenseId!).subscribe();
    this.ausgaben = this.ausgaben.filter(
      (a) => a.expenseId !== ausgabe.expenseId
    );
  }

  getErrorMessage(formField: any): string {
    if (formField.hasError('required')) return 'Pflichtfeld';
    if (
      formField.hasError('min') &&
      formField.control.errors.min.actual < formField.control.errors.min.min
    ) {
      return 'Der Wert darf nicht negativ sein';
    }
    return '';
  }
}
