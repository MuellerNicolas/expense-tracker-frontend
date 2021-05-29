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

  getAusgabeJeKategorieAktuellerMonat() {
    
  }

  getAusgabeJeKategorieHalbesJahr() {

  }

  getBudgetauslastungJeKategorieAktuellerMonat() {

  }


}
