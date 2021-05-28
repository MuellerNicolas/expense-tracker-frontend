import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { AUSGABEN } from './ausgaben/ausgaben-mock';
import { BUDGETS } from './budgets/budget-mock';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const ausgaben = AUSGABEN;
    const budgets = BUDGETS;
    return {ausgaben, budgets};
  }
}