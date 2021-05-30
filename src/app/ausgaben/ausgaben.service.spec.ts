import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AusgabenService } from './ausgaben.service';

describe('AusgabenService', () => {
  let service: AusgabenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule ],
    });
    service = TestBed.inject(AusgabenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
