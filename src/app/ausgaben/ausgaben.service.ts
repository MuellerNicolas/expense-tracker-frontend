import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ausgabe } from './ausgabe.model';

@Injectable({
  providedIn: 'root'
})
export class AusgabenService {

  backendAPI: string = environment.backendAPI;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(`${operation} failed: ${error.message}`);
      // Default-Wert zurückgeben
      return of(result as T);
    };
  }

  constructor(private httpClient: HttpClient) { }

  getAusgaben(): Observable<Ausgabe[]> {
    return this.httpClient.get<Ausgabe[]>(`${this.backendAPI}/ausgaben`)
    .pipe(
      catchError(this.handleError<Ausgabe[]>('getAusgaben', []))
    );
  }

  getAusgabe(id: number): Observable<Ausgabe> {
    return this.httpClient.get<Ausgabe>(`${this.backendAPI}/ausgaben/${id}`)
    .pipe(
      catchError(this.handleError<Ausgabe>('getAusgabe id=${id}'))
    );
  }
  
  updateAusgabe(ausgabe: Ausgabe): Observable<Ausgabe> {
    return this.httpClient.put<Ausgabe>(`${this.backendAPI}/ausgaben/${ausgabe.id}`, ausgabe, this.httpOptions)
    .pipe(
      catchError(this.handleError<any>('updateAusgabe'))
    );
  }

  addAusgabe(ausgabe: Ausgabe): Observable<Ausgabe> {
    return this.httpClient.post<Ausgabe>(`${this.backendAPI}/ausgaben`, ausgabe, this.httpOptions)
    .pipe(
      catchError(this.handleError<any>('addAusgabe'))
    );
  }

  deleteAusgabe(id: number): Observable<Ausgabe> {
    return this.httpClient.delete<Ausgabe>(`${this.backendAPI}/ausgaben/${id}`, this.httpOptions)
    .pipe(
      catchError(this.handleError<any>('deleteAusgabe'))
    );
  }
}
