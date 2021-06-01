import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { BUDGETS } from './budget-mock';
import { BudgetsComponent } from './budgets.component';
import { BudgetsService } from './budgets.service';

describe('BudgetsComponent', () => {
  let component: BudgetsComponent;
  let fixture: ComponentFixture<BudgetsComponent>;

  beforeEach(async () => {
    const budgetsServiceStub = {
      getBudgets() {
        return of(BUDGETS);
      }
    };

    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ BudgetsComponent ],
      providers: [ {provide: BudgetsService, useValue: budgetsServiceStub}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetsComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
