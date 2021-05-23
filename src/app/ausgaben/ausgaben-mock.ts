import { Ausgabe } from '../ausgabe.model';

export const AUSGABEN: Ausgabe[] = [
    {
      "id": 1,
      "name": "Fahrradpumpe",
      "betrag": 10,
      "waehrung": "€",
      "kategorie": "Freizeit",
      "datum": new Date("December 17, 1995 03:24:00")
    },
    {
      "id": 2,
      "name": "Brot",
      "betrag": 1.5,
      "waehrung": "€",
      "kategorie": "Essen & Trinken",
      "datum": new Date("December 18, 1995 03:24:00")
    },
    {
      "id": 3,
      "name": "Wein",
      "betrag": 3.5,
      "waehrung": "€",
      "kategorie": "Essen & Trinken",
      "datum": new Date("December 19, 1995 03:24:00")
    }
]