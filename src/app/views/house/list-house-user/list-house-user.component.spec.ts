import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHouseUserComponent } from './list-house-user.component';

describe('ListHouseUserComponent', () => {
  let component: ListHouseUserComponent;
  let fixture: ComponentFixture<ListHouseUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHouseUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHouseUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
