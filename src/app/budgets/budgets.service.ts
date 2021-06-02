import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Budget } from './budget.model';
import { ServiceHelperService } from '../shared/service-helper.service';

@Injectable({
  providedIn: 'root',
})
export class BudgetsService {
  backendAPI: string = environment.backendAPI;

  constructor(
    private httpClient: HttpClient,
    private serviceHelperService: ServiceHelperService
  ) {}

  getBudgets(): Observable<Budget[]> {
    return this.httpClient
      .get<Budget[]>(`${this.backendAPI}/budgets/`)
      .pipe(
        catchError(
          this.serviceHelperService.handleError<Budget[]>('getBudget', [])
        )
      );
  }

  updateBudget(budget: Budget): Observable<Budget> {
    return this.httpClient
      .put<Budget>(
        `${this.backendAPI}/budgets/${budget.id}`,
        budget,
        this.serviceHelperService.getHttpOptionPutAndPost()
      )
      .pipe(
        catchError(this.serviceHelperService.handleError<any>('updateBudget'))
      );
  }
}
