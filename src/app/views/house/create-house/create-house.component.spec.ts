import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHouseComponent } from './create-house.component';

describe('CreatePostComponent', () => {
  let component: CreateHouseComponent;
  let fixture: ComponentFixture<CreateHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
