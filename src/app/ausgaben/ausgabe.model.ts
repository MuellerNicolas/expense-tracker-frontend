export class Ausgabe {
  expenseId?: string;
  name?: string;
  betrag?: number;
  kategorie?: string;
  datum?: Date;
  userId: string;

  constructor(
    expenseId?: string,
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
