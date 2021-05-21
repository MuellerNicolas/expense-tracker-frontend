import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AusgabenComponent } from './ausgaben/ausgaben.component';
import { UebersichtComponent } from './uebersicht/uebersicht.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { ErfolgeComponent } from './erfolge/erfolge.component';

@NgModule({
  declarations: [
    AppComponent,
    AusgabenComponent,
    UebersichtComponent,
    BudgetsComponent,
    ErfolgeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
