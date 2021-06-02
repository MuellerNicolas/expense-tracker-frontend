export class Ausgabe {
  id?: number;
  name?: string;
  betrag?: number;
  kategorie?: string;
  datum?: Date;

  constructor(
    id?: number,
    name?: string,
    betrag?: number,
    kategorie?: string,
    datum?: Date
  ) {
    this.id = id;
    this.name = name;
    this.betrag = betrag;
    this.kategorie = kategorie;
    this.datum = datum;
  }
}
