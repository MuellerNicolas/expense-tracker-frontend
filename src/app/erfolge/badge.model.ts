export class Badge {
    kategorieId?: number;
    kategorieName?: string;
    monateEingehaltenTotal?: number;
    symbol?: string;
    farbe?: string;
    farbeNaechsteStufe?: string;
    fortschritt?: number;

    constructor(kategorieId?: number, kategorieName?: string, monateEingehaltenTotal?: number, 
                symbol?: string, farbe?: string, farbeNaechsteStufe?: string, fortschritt?: number,) {
        this.kategorieId = kategorieId;
        this.kategorieName = kategorieName;
        this.monateEingehaltenTotal = monateEingehaltenTotal;
        this.symbol = symbol;
        this.farbe = farbe;
        this.farbeNaechsteStufe = farbeNaechsteStufe;
        this.fortschritt = fortschritt;
    }
}
