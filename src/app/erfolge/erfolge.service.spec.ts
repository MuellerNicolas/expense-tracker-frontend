import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ErfolgeService } from './erfolge.service';

describe('ErfolgeService', () => {
  let service: ErfolgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule ],
    });
    service = TestBed.inject(ErfolgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
