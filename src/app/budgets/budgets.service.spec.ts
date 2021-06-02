import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BudgetsService } from './budgets.service';

describe('BudgetsService', () => {
  let service: BudgetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(BudgetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
