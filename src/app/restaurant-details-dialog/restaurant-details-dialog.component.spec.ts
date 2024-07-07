import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantDetailsDialogComponent } from './restaurant-details-dialog.component';

describe('RestaurantDetailsDialogComponent', () => {
  let component: RestaurantDetailsDialogComponent;
  let fixture: ComponentFixture<RestaurantDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantDetailsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
