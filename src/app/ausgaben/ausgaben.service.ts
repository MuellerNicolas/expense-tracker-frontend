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

  updateAusgabe(ausgabe: Ausgabe): Observable<Ausgabe> {
    return this.httpClient
      .put<Ausgabe>(
        `${this.backendAPI}/ausgaben/${ausgabe.id}`,
        ausgabe,
        this.serviceHelperService.getHttpOptionPutAndPost()
      )
      .pipe(
        catchError(this.serviceHelperService.handleError<any>('updateAusgabe'))
      );
  }

  addAusgabe(ausgabe: any): Observable<Ausgabe> {
    // Backend akzeptiert nur ISO Datum
    ausgabe.datum = ausgabe.datum!.toISOString();
    return this.httpClient
      .post<Ausgabe>(
        `${this.backendAPI}/ausgaben`,
        ausgabe,
        this.serviceHelperService.getHttpOptionPutAndPost()
      )
      .pipe(
        catchError(this.serviceHelperService.handleError<any>('addAusgabe'))
      );
  }

  deleteAusgabe(id: number): Observable<Ausgabe> {
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
