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
      },
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [BudgetsComponent],
      providers: [{ provide: BudgetsService, useValue: budgetsServiceStub }],
    }).compileComponents();

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

  it('should return error message "Pflichtfeld"', () => {
    // FormField-Mock
    const formField = {
      hasError(input: string): boolean {
        if (input === 'required') return true;
        if (input === 'min') return false;
        else return false;
      },
    };
    expect(component.getErrorMessage(formField)).toBe('Pflichtfeld');
  });

  it('should return error message "Der Wert darf nicht negativ sein"', () => {
    // FormField-Mock
    const formField = {
      control: {
        errors: {
          min: {
            actual: -1,
            min: 0,
          },
        },
      },
      hasError(input: string): boolean {
        if (input === 'required') return false;
        if (input === 'min') return true;
        else return false;
      },
    };
    expect(component.getErrorMessage(formField)).toBe(
      'Der Wert darf nicht negativ sein'
    );
  });

  it('should return an empty error message', () => {
    // FormField-Mock
    const formField = {
      hasError(input: string): boolean {
        if (input === 'required') return false;
        if (input === 'min') return false;
        else return false;
      },
    };
    expect(component.getErrorMessage(formField)).toBe('');
  });
});
