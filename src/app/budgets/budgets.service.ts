import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Budget } from './budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetsService {

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

  getBudgets(): Observable<Budget[]> {
    return this.httpClient.get<Budget[]>(`${this.backendAPI}/budgets/`)
    .pipe(
      catchError(this.handleError<Budget[]>('getBudget', []))
    );
  }

  updateBudget(budget: Budget): Observable<Budget> {
    return this.httpClient.put<Budget>(`${this.backendAPI}/budgets/${budget.kategorieId}`, budget, this.httpOptions)
    .pipe(
      catchError(this.handleError<any>('updateBudget'))
    );
  }
}
