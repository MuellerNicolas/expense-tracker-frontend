import { Ausgabe } from './ausgabe.model';

export const AUSGABEN: Ausgabe[] = [
  {
    expenseId: '1',
    name: 'Fahrradpumpe',
    betrag: 10,
    kategorie: 'Freizeit',
    datum: new Date('December 17, 1995 03:24:00'),
    userId: '1',
  },
  {
    expenseId: '2',
    name: 'Brot',
    betrag: 1.5,
    kategorie: 'Essen und Trinken',
    datum: new Date('December 18, 1995 03:24:00'),
    userId: '1',
  },
  {
    expenseId: '3',
    name: 'Wein',
    betrag: 3.5,
    kategorie: 'Essen und Trinken',
    datum: new Date('December 19, 1995 03:24:00'),
    userId: '1',
  },
];
