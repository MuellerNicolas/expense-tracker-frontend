import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UebersichtService } from './uebersicht.service';

describe('UebersichtService', () => {
  let service: UebersichtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule ],
    });
    service = TestBed.inject(UebersichtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
