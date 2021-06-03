export class Ausgabe {
  expenseId?: number;
  name?: string;
  betrag?: number;
  kategorie?: string;
  datum?: Date;
  userId: string;

  constructor(
    expenseId?: number,
    name?: string,
    betrag?: number,
    kategorie?: string,
    datum?: Date
  ) {
    this.expenseId = expenseId;
    this.name = name;
    this.betrag = betrag;
    this.kategorie = kategorie;
    this.datum = datum;
    this.userId = '1';
  }
}
