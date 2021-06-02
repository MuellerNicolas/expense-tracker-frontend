import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BudgetsService } from '../budgets/budgets.service';
import { BADGES } from './badges-mock';
import { BUDGETSTREAK } from './budget-streak-mock';

import { ErfolgeComponent } from './erfolge.component';

describe('ErfolgeComponent', () => {
  let component: ErfolgeComponent;
  let fixture: ComponentFixture<ErfolgeComponent>;

  beforeEach(async () => {
    const erfolgeServiceStub = {
      getBadges() {
        return of(BADGES);
      },
      getBudgetStreak() {
        return of(BUDGETSTREAK);
      },
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      declarations: [ErfolgeComponent],
      providers: [{ provide: BudgetsService, useValue: erfolgeServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(ErfolgeComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErfolgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
