import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ItemService} from "../service/item.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import ItemDTO from "../model/item-dto";

@Component({
  selector: 'app-item-add-edit-dialog',
  templateUrl: './item-add-edit-dialog.component.html',
  styleUrls: ['./item-add-edit-dialog.component.scss']
})
export class ItemAddEditDialogComponent implements OnInit {

  itemForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ItemAddEditDialogComponent>,
    private _fb: FormBuilder,
    private _itemService: ItemService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.itemForm = this._fb.group({
      name: "",
      description: "",
      imageUrl: "",
      price: 0,
      isActive: false,
      stock: 0,
    })
  }
  ngOnInit() {
    this.itemForm.patchValue(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSubmitClick(): void {

    if(!this.itemForm.valid ||
      this.itemForm.value.name == null ||
      this.itemForm.value.description == null ||
      this.itemForm.value.imageUrl == null ||
      this.itemForm.value.price == null ||
      this.itemForm.value.stock == null
    ) {
      this._snackBar.open('Халепа! Неправильно введено дані', 'Окей', {
        duration: 5000
      });
      return;
    }

    if (this.data) {
      this._itemService.updateItem(this.data.id, this.itemForm.value).subscribe({
        next: (val: ItemDTO) => {
          this.dialogRef.close(true);
          this._snackBar.open(`Товар #${val.id} успішно відредаговано!`, 'Окей', {
            duration: 5000
          });
        },
        error: (val: any) => {
          this._snackBar.open(`Виникла помилка при оновлені товару!`, 'Окей', {
            duration: 5000
          });
          console.error(val)
        }
      })
      return;
    }

    this._itemService.createItem(this.itemForm.value).subscribe({
      next: (val: ItemDTO) => {
        this.dialogRef.close(true);
        this._snackBar.open(`Товар #${val.id} успішно створено!`, 'Окей', {
          duration: 5000
        });
      },
      error: (val: any) => {
        this._snackBar.open('Виникла помилка при створенні товару!', 'Окей', {
          duration: 5000
        });
        console.error(val)
      }
    })

  }
}
