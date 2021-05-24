import { Component, OnInit } from '@angular/core';
import { Ausgabe } from '../ausgabe.model';
import { AUSGABEN } from './ausgaben-mock';

@Component({
  selector: 'ausgaben',
  templateUrl: './ausgaben.component.html',
  styleUrls: ['./ausgaben.component.scss']
})
export class AusgabenComponent implements OnInit {
  ausgaben: Ausgabe[] = AUSGABEN;
  neueAusgabe: Ausgabe = new Ausgabe();
  kategorien: String[] = ["Essen und Trinken", "Reisen", "Infrastruktur", "Mobilität", "Bekleidung", "Freizeit", "Ausbildung und Studium", "Versicherungen", "Sonstige Ausgaben"];

  constructor() {}

  ngOnInit(): void {
    // nach Datum sortieren
    this.ausgaben.sort((a: Ausgabe, b: Ausgabe) => <any>b.datum - <any>a.datum)
    this.kategorien.sort();
  }

  hinzufuegen(ausgabe: Ausgabe) {
    console.log('Hinzufügen:')
    console.log(ausgabe);
    // Hinzufügen und nach Datum sortieren
    this.ausgaben.push(this.neueAusgabe);
    this.ausgaben.sort((a: Ausgabe, b: Ausgabe) => <any>b.datum - <any>a.datum)
    // Hinzufügen-Form resetten
    this.neueAusgabe = new Ausgabe();
  }

  aktualisieren(ausgabe: Ausgabe) {
    console.warn('Aktualisiere:')
    console.log(ausgabe);
    // backend-Aufruf zum Aktualisieren

  }

  loeschen(ausgabe: Ausgabe) {
    console.warn('Lösche:')
    console.log(ausgabe);
    // backend-Aufruf zum Löschen


    // frontend-seitiges löschen
    this.ausgaben = this.ausgaben.filter( einzelneAusgabe => einzelneAusgabe.id !== ausgabe.id );
  }

  getErrorMessage(formField: any){
    if(formField.hasError("required")) return "Pflichtfeld";

    if(formField.hasError("min") && formField.control.errors.min.actual < formField.control.errors.min.min) {
      return "Der Wert darf nicht negativ sein";
    }

    else return "";
  }

}
