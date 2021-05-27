import { Component, OnInit } from '@angular/core';
import { Ausgabe } from '../ausgabe.model';
import { AusgabenService } from '../ausgaben.service';

@Component({
  selector: 'ausgaben',
  templateUrl: './ausgaben.component.html',
  styleUrls: ['./ausgaben.component.scss']
})
export class AusgabenComponent implements OnInit {
  ausgaben: Ausgabe[] = [];
  neueAusgabe: Ausgabe = new Ausgabe();
  kategorien: String[] = ["Essen und Trinken", "Reisen", "Infrastruktur", "Mobilität", "Bekleidung", "Freizeit", "Ausbildung und Studium", "Versicherungen", "Sonstige Ausgaben"];

  constructor(private ausgabenService: AusgabenService) {}

  ngOnInit(): void {
    this.getAusgaben();
    this.kategorien.sort();
  }

  getAusgaben(): void {
    this.ausgabenService.getAusgaben().subscribe(ausgaben => {
      this.ausgaben = ausgaben;
      // Nach Datum ordnen
      this.ausgaben.sort((a: Ausgabe, b: Ausgabe) => <any>b.datum - <any>a.datum)
    });
  }

  add(ausgabe: Ausgabe): void {
    if(!ausgabe) return;
    this.ausgabenService.addAusgabe(ausgabe).subscribe(ausgabe => {
      // Neue Ausgabe hinzufügen
      this.ausgaben.push(ausgabe);
      // Nach Datum ordnen
      this.ausgaben.sort((a: Ausgabe, b: Ausgabe) => <any>b.datum - <any>a.datum)
    });
    // Hinzufügen-Form resetten
    this.neueAusgabe = new Ausgabe();
  }

  update(ausgabe: Ausgabe): void {
    if(!ausgabe) return;
    this.ausgabenService.updateAusgabe(ausgabe).subscribe();
  }

  delete(ausgabe: Ausgabe): void {
    if(!ausgabe.id) return;
    this.ausgabenService.deleteAusgabe(ausgabe.id!).subscribe();
    this.ausgaben = this.ausgaben.filter(a => a.id !== ausgabe.id);
  }

  getErrorMessage(formField: any): string{
    if(formField.hasError("required")) return "Pflichtfeld";
    if(formField.hasError("min") && formField.control.errors.min.actual < formField.control.errors.min.min) {
      return "Der Wert darf nicht negativ sein";
    } else return "";
  }

}
