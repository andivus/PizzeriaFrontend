import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ItemAddEditDialogComponent} from "../item-add-edit-dialog/item-add-edit-dialog.component";
import {CartService} from "../../service/cart.service";
import {UtilsService} from "../../service/utils.service";

@Component({
  selector: 'app-item-user-dialog',
  templateUrl: './item-user-dialog.component.html',
  styleUrls: ['./item-user-dialog.component.scss']
})
export class ItemUserDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ItemUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _cartService: CartService,
    public _utilsService: UtilsService
  ) {
  }

}
