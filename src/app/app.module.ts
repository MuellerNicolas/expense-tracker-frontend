import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AusgabenComponent } from './ausgaben/ausgaben.component';
import { UebersichtComponent } from './uebersicht/uebersicht.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { ErfolgeComponent } from './erfolge/erfolge.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { PunktZuKommaPipe } from './shared/punkt-zu-komma.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AusgabenComponent,
    UebersichtComponent,
    BudgetsComponent,
    ErfolgeComponent,
    PunktZuKommaPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatDialogModule,
    MatListModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
