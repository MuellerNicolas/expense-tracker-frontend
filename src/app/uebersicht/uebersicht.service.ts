import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UebersichtService {

  backendAPI: string = environment.backendAPI;

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(`${operation} failed: ${error.message}`);
      // Default-Wert zurückgeben
      return of(result as T);
    };
  }

  constructor(private httpClient: HttpClient) { }

  getAusgabeJeKategorieAktuellerMonat(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.backendAPI}/AusgabeJeKategorieAktuellerMonat/`)
    .pipe(
      catchError(this.handleError<any[]>('getAusgabeJeKategorieAktuellerMonat', []))
    );
  }

  getAusgabeJeKategorieHalbesJahr(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.backendAPI}/AusgabeJeKategorieHalbesJahr/`)
    .pipe(
      catchError(this.handleError<any[]>('getAusgabeJeKategorieHalbesJahr', []))
    );
  }

  getBudgetauslastungJeKategorieAktuellerMonat(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.backendAPI}/BudgetauslastungJeKategorieAktuellerMonat/`)
    .pipe(
      catchError(this.handleError<any[]>('getBudgetauslastungJeKategorieAktuellerMonat', []))
    );
  }
}
