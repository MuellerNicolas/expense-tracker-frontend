export class Budget {
    id?: number;
    betrag?: number;
    kategorieName?: string;
    
    constructor(id?: number, betrag?: number, kategorieName?: string){
        this.id = id;
        this.betrag = betrag;
        this.kategorieName = kategorieName;
    }
}
