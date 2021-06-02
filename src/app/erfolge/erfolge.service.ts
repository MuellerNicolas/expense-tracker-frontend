import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Badge } from './badge.model';
import { ServiceHelperService } from '../shared/service-helper.service';

@Injectable({
  providedIn: 'root',
})
export class ErfolgeService {
  backendAPI: string = environment.backendAPI;

  constructor(
    private httpClient: HttpClient,
    private serviceHelperService: ServiceHelperService
  ) {}

  getBudgetStreak(): Observable<any> {
    return this.httpClient
      .get<any>(`${this.backendAPI}/budgetStreak`)
      .pipe(
        catchError(
          this.serviceHelperService.handleError<any>('getBudgetStreak', 0)
        )
      );
  }

  getBadges(): Observable<Badge[]> {
    return this.httpClient
      .get<Badge[]>(`${this.backendAPI}/badges/`)
      .pipe(
        catchError(
          this.serviceHelperService.handleError<Badge[]>('getBadges', [])
        )
      );
  }
}
