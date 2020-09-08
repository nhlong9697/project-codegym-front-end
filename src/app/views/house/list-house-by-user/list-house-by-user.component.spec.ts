import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHouseByUserComponent } from './list-house-by-user.component';

describe('ListHouseByUserComponent', () => {
  let component: ListHouseByUserComponent;
  let fixture: ComponentFixture<ListHouseByUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHouseByUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHouseByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
