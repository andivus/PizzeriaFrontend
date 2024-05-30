import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemsDialogComponent } from './order-items-dialog.component';

describe('UserPageComponent', () => {
  let component: OrderItemsDialogComponent;
  let fixture: ComponentFixture<OrderItemsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderItemsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderItemsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
