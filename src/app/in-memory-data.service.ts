import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { AUSGABEN } from './ausgaben/ausgaben-mock';
import { BUDGETS } from './budgets/budget-mock';
import { BADGES } from './erfolge/badges-mock';
import { BUDGETSTREAK } from './erfolge/budget-streak-mock';
import { gaugeChartDataMock } from './uebersicht/gauge-chart-data-mock';
import { lineChartDataMock } from './uebersicht/line-chart-data-mock';
import { pieChartDataMock } from './uebersicht/pie-chart-data-mock';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const ausgaben = AUSGABEN;
    const budgets = BUDGETS;
    const AusgabeJeKategorieAktuellerMonat = pieChartDataMock;
    const AusgabeJeKategorieHalbesJahr = lineChartDataMock;
    const BudgetauslastungJeKategorieAktuellerMonat = gaugeChartDataMock;
    const badges = BADGES;
    const budgetStreak = BUDGETSTREAK;
    return {
      ausgaben,
      budgets,
      AusgabeJeKategorieAktuellerMonat,
      AusgabeJeKategorieHalbesJahr,
      BudgetauslastungJeKategorieAktuellerMonat,
      badges,
      budgetStreak,
    };
  }
}
