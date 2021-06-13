import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AusgabenComponent } from './ausgaben/ausgaben.component';
import { UebersichtComponent } from './uebersicht/uebersicht.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { ErfolgeComponent } from './erfolge/erfolge.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CUSTOM_DATE_FORMATS } from './custom-date-format';

// import {
//   MAT_MOMENT_DATE_FORMATS,
//   MomentDateAdapter,
//   MAT_MOMENT_DATE_ADAPTER_OPTIONS,
// } from '@angular/material-moment-adapter';
// import {
//   DateAdapter,
//   MAT_DATE_FORMATS,
// } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    AusgabenComponent,
    UebersichtComponent,
    BudgetsComponent,
    ErfolgeComponent,
  ],
  imports: [
    SharedModule,
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
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatGridListModule,
    MatProgressBarModule,
    MatCardModule,
    HttpClientModule,
    NgxChartsModule,
  ],
  providers: [
    // { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    // { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    //   {
    //     provide: DateAdapter,
    //     useClass: MomentDateAdapter,
    //     deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    //   },
    //   { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
