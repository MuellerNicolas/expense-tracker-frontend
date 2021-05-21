import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UebersichtComponent } from './uebersicht/uebersicht.component';
import { AusgabenComponent } from './ausgaben/ausgaben.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { ErfolgeComponent } from './erfolge/erfolge.component';

// order routes from specific to general!
const routes: Routes = [
  { path: 'uebersicht', component: UebersichtComponent},
  { path: 'ausgaben', component: AusgabenComponent},
  { path: 'budgets', component: BudgetsComponent},
  { path: 'erfolge', component: ErfolgeComponent},
  { path: '**', redirectTo: 'uebersicht'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
