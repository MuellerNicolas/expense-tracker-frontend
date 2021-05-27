import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Ausgabe } from './ausgabe.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const ausgaben = [
      {
        "id": 1,
        "name": "Fahrradpumpe",
        "betrag": 10,
        "kategorie": "Freizeit",
        "datum": "Fri May 21 2021 00:00:00 GMT+0200 (Mitteleuropäische Sommerzeit)"
      },
      {
        "id": 2,
        "name": "Brot",
        "betrag": 1.5,
        "kategorie": "Essen und Trinken",
        "datum": "December 18, 1995 03:24:00"
      },
      {
        "id": 3,
        "name": "Wein",
        "betrag": 3.5,
        "kategorie": "Essen und Trinken",
        "datum": "December 19, 1995 03:24:00"
      }
    ];
    return {ausgaben};
  }
}