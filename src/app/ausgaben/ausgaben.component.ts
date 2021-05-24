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

  constructor() {
    // this.ausgaben = [
    //   new Ausgabe(1, "Fahrradpumpe", 10, "€", "Freizeit", new Date("December 17, 1995 03:24:00")),
    //   new Ausgabe(2, "Brot", 1.5, "€", "Essen & Trinken", new Date("December 18, 1995 03:24:00")),
    //   new Ausgabe(3, "Wein", 3.5, "€", "Essen & Trinken",new Date("December 19, 1995 03:24:00"))
    // ];
  }

  ngOnInit(): void {
    this.ausgaben.sort((a: Ausgabe, b: Ausgabe) => <any>b.datum - <any>a.datum)
    this.kategorien.sort();
  }

  hinzufuegen(ausgabe: Ausgabe) {
    console.log('Hinzufügen:')
    console.log(ausgabe);
    
    this.ausgaben.push(this.neueAusgabe);
    this.ausgaben.sort((a: Ausgabe, b: Ausgabe) => <any>b.datum - <any>a.datum)
    // Hinzufügen resetten
    this.neueAusgabe = new Ausgabe();
  }

  aktualisieren(ausgabe: Ausgabe) {
    console.log('Aktualisiere:')
    console.log(ausgabe);
  }

  loeschen(ausgabe: Ausgabe) {
    console.log('Lösche:')
    console.log(ausgabe);
  }

  getErrorMessage(formField: any){
    if(formField.hasError("required")) return "Pflichtfeld";
    if(formField.hasError("min") && formField.control.errors.min.actual < formField.control.errors.min.min) {
      return "Der Wert darf nicht negativ sein"
    }
    else return "";
  }

}
