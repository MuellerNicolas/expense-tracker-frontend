export class Budget {
    id?: number;
    betrag?: number;
    kategorie?: string;
    
    constructor(id?: number, betrag?: number, kategorie?: string){
        this.id = id;
        this.betrag = betrag;
        this.kategorie = kategorie;
    }
}
