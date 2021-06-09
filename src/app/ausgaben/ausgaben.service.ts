import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ausgabe } from './ausgabe.model';
import { ServiceHelperService } from '../shared/service-helper.service';

@Injectable({
  providedIn: 'root',
})
export class AusgabenService {
  backendAPI: string = environment.backendAPI;

  constructor(
    private httpClient: HttpClient,
    private serviceHelperService: ServiceHelperService
  ) {}

  getAusgaben(): Observable<Ausgabe[]> {
    return this.httpClient
      .get<Ausgabe[]>(`${this.backendAPI}/ausgaben/`)
      .pipe(
        catchError(
          this.serviceHelperService.handleError<Ausgabe[]>('getAusgaben', [])
        )
      );
  }

  getAusgabe(id: number): Observable<Ausgabe> {
    return this.httpClient
      .get<Ausgabe>(`${this.backendAPI}/ausgaben/${id}`)
      .pipe(
        catchError(
          this.serviceHelperService.handleError<Ausgabe>('getAusgabe id=${id}')
        )
      );
  }

  updateAusgabe(ausgabe: any): Observable<Ausgabe> {
    // Backend akzeptiert nur ISO Datum - Problem mit MongoDB und SpringBoot - da Konverter keine Timezone akzeptiert
    // Lösung UTC-Datum in ISO String transformieren
    const day = ausgabe.datum.getDate();
    const month = ausgabe.datum.getMonth();
    const year = ausgabe.datum.getFullYear();
    const utcDate = new Date(Date.UTC(year, month, day, 0, 0, 0));

    let ausgabeWithIsoDate: any = new Ausgabe(
      ausgabe.expenseId,
      ausgabe.name,
      ausgabe.betrag,
      ausgabe.kategorie,
      ausgabe.datum
    );

    ausgabeWithIsoDate.datum = utcDate.toISOString();

    return this.httpClient
      .put<Ausgabe>(
        `${this.backendAPI}/ausgaben/${ausgabeWithIsoDate.expenseId}`,
        ausgabeWithIsoDate,
        this.serviceHelperService.getHttpOptionPutAndPost()
      )
      .pipe(
        catchError(this.serviceHelperService.handleError<any>('updateAusgabe'))
      );
  }

  addAusgabe(ausgabe: any): Observable<Ausgabe> {
    // Backend akzeptiert nur ISO Datum - Problem mit MongoDB und SpringBoot - da Konverter keine Timezone akzeptiert
    // Lösung UTC-Datum in ISO String transformieren
    const day = ausgabe.datum.getDate();
    const month = ausgabe.datum.getMonth();
    const year = ausgabe.datum.getFullYear();
    const utcDate = new Date(Date.UTC(year, month, day, 0, 0, 0));

    ausgabe.datum = utcDate.toISOString();

    return this.httpClient
      .post<Ausgabe>(
        `${this.backendAPI}/ausgaben/`,
        ausgabe,
        this.serviceHelperService.getHttpOptionPutAndPost()
      )
      .pipe(
        catchError(this.serviceHelperService.handleError<any>('addAusgabe'))
      );
  }

  deleteAusgabe(id: string): Observable<Ausgabe> {
    return this.httpClient
      .delete<Ausgabe>(
        `${this.backendAPI}/ausgaben/${id}`,
        this.serviceHelperService.getHttpOptionPutAndPost()
      )
      .pipe(
        catchError(this.serviceHelperService.handleError<any>('deleteAusgabe'))
      );
  }
}
