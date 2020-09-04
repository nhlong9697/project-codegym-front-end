import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReservationUserComponent } from './list-reservation-user.component';

describe('ListReservationUserComponent', () => {
  let component: ListReservationUserComponent;
  let fixture: ComponentFixture<ListReservationUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReservationUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReservationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
