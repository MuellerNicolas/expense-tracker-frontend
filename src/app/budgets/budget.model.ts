export class Budget {
    kategorieId?: number;
    betrag?: number;
    kategorieName?: string;
    
    constructor(kategorieId?: number, betrag?: number, kategorieName?: string){
        this.kategorieId = kategorieId;
        this.betrag = betrag;
        this.kategorieName = kategorieName;
    }
}
