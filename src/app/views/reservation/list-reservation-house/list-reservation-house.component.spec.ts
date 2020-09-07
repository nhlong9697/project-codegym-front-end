import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReservationHouseComponent } from './list-reservation-house.component';

describe('ListReservationHouseComponent', () => {
  let component: ListReservationHouseComponent;
  let fixture: ComponentFixture<ListReservationHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReservationHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReservationHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
