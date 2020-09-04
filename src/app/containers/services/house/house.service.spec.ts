import { TestBed } from '@angular/core/testing';

import { HouseService } from './house.service';

<<<<<<< HEAD
describe('HouseService', () => {
=======
describe('HousesServiceService', () => {
>>>>>>> long
  let service: HouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
