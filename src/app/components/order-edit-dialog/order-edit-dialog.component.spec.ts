import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderEditDialogComponent } from './order-edit-dialog.component';

describe('UserPageComponent', () => {
  let component: OrderEditDialogComponent;
  let fixture: ComponentFixture<OrderEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
