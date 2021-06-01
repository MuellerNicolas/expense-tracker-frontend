import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Badge } from './badge.model';

@Injectable({
  providedIn: 'root'
})
export class ErfolgeService {
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
  
  getBudgetStreak(): Observable<any> {
    return this.httpClient.get<any>(`${this.backendAPI}/budgetStreak`)
    .pipe(
      catchError(this.handleError<any>('getBudgetStreak', 0))
    );
  }

  getBadges(): Observable<Badge[]> {
    return this.httpClient.get<Badge[]>(`${this.backendAPI}/badges/`)
    .pipe(
      catchError(this.handleError<Badge[]>('getBadges', []))
    );
  }
}
