import { TestBed } from '@angular/core/testing';

import { ErfolgeService } from './erfolge.service';

describe('ErfolgeService', () => {
  let service: ErfolgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErfolgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
