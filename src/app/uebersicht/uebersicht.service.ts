import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceHelperService } from '../shared/service-helper.service';

@Injectable({
  providedIn: 'root'
})
export class UebersichtService {

  backendAPI: string = environment.backendAPI;

  constructor(private httpClient: HttpClient, private serviceHelperService: ServiceHelperService) { }

  getAusgabeJeKategorieAktuellerMonat(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.backendAPI}/AusgabeJeKategorieAktuellerMonat/`)
    .pipe(
      catchError(this.serviceHelperService.handleError<any[]>('getAusgabeJeKategorieAktuellerMonat', []))
    );
  }

  getAusgabeJeKategorieHalbesJahr(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.backendAPI}/AusgabeJeKategorieHalbesJahr/`)
    .pipe(
      catchError(this.serviceHelperService.handleError<any[]>('getAusgabeJeKategorieHalbesJahr', []))
    );
  }

  getBudgetauslastungJeKategorieAktuellerMonat(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.backendAPI}/BudgetauslastungJeKategorieAktuellerMonat/`)
    .pipe(
      catchError(this.serviceHelperService.handleError<any[]>('getBudgetauslastungJeKategorieAktuellerMonat', []))
    );
  }
}
