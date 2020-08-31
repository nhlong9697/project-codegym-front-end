import { TestBed } from '@angular/core/testing';

import { HousesServiceService } from './houses-service.service';

describe('HousesServiceService', () => {
  let service: HousesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HousesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
