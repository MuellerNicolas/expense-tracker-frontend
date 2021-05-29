import { ComponentFixture, TestBed } from '@angular/core/testing';
import { pieChartDataMock } from './pie-chart-data-mock';
import { lineChartDataMock } from './line-chart-data-mock';
import { gaugeChartDataMock } from './gauge-chart-data-mock';
import { UebersichtComponent } from './uebersicht.component';
import { of } from 'rxjs';
import { UebersichtService } from './uebersicht.service';

describe('UebersichtComponent', () => {
  let component: UebersichtComponent;
  let fixture: ComponentFixture<UebersichtComponent>;

  beforeEach(async () => {
    const uebersichtServiceStub = {
      getAusgabeJeKategorieAktuellerMonat() {
        const MOCK = pieChartDataMock;
        return of( MOCK );
      },
      getAusgabeJeKategorieHalbesJahr() {
        const MOCK = lineChartDataMock;
        return of( MOCK );
      },
      getBudgetauslastungJeKategorieAktuellerMonat() {
        const MOCK = gaugeChartDataMock;
        return of( MOCK );
      }
    };

    await TestBed.configureTestingModule({
      imports: [],
      declarations: [ UebersichtComponent ],
      providers: [ {provide: UebersichtService, useValue: uebersichtServiceStub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
