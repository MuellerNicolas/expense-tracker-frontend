import { Component, OnInit } from '@angular/core';
import { Ausgabe } from '../ausgabe.model';
import { AUSGABEN } from './ausgaben-mock';
import { PunktZuKommaPipe } from '../shared/punkt-zu-komma.pipe'

@Component({
  selector: 'ausgaben',
  templateUrl: './ausgaben.component.html',
  styleUrls: ['./ausgaben.component.scss']
})
export class AusgabenComponent implements OnInit {
  ausgaben: Ausgabe[] = AUSGABEN;
  
  constructor() {
    // this.ausgaben = [
    //   new Ausgabe(1, "Fahrradpumpe", 10, "€", "Freizeit", new Date("December 17, 1995 03:24:00")),
    //   new Ausgabe(2, "Brot", 1.5, "€", "Essen & Trinken", new Date("December 18, 1995 03:24:00")),
    //   new Ausgabe(3, "Wein", 3.5, "€", "Essen & Trinken",new Date("December 19, 1995 03:24:00"))
    // ];
  }

  ngOnInit(): void {
    
  }

}
