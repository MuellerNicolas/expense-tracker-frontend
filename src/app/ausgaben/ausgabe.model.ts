export class Ausgabe {
    id?: number;
    name?: string;
    betrag?: number;
    waehrung?: string;
    kategorie?: string;
    datum?: Date;
    
    constructor(id?: number, name?: string, betrag?: number, waehrung?: string, kategorie?: string, datum?: Date){
        this.id = id;
        this.name = name;
        this.betrag = betrag;
        this.waehrung = waehrung;
        this.kategorie = kategorie;
        this.datum = datum;
    }
}
