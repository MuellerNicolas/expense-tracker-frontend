import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceHelperService {

  constructor() { }

  getHttpOptionPutAndPost(): any {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(`${operation} failed: ${error.message}`);
      // Default-Wert zurückgeben
      return of(result as T);
    };
  }
}
