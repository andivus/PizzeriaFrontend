import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditItemComponent } from './add-edit-item.component';

describe('AddItemComponent', () => {
  let component: AddEditItemComponent;
  let fixture: ComponentFixture<AddEditItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditItemComponent]
    });
    fixture = TestBed.createComponent(AddEditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
