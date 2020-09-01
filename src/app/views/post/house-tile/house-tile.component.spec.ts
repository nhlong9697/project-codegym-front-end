import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseTileComponent } from './house-tile.component';

describe('PostTileComponent', () => {
  let component: HouseTileComponent;
  let fixture: ComponentFixture<HouseTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
