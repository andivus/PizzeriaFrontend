import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {CartService} from "../service/cart.service";
import ItemDTO from "../model/item-dto";
import {ItemService} from "../service/item.service";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.scss']
})
export class CartDialogComponent {

  dataSource!: Array<ItemDTO>;

  ngOnInit(): void {
    this.getItemList()
    this.dataSource = []
  }

  constructor(
    public dialogRef: MatDialogRef<CartDialogComponent>,
    public _cartService: CartService,
    public _itemService: ItemService,
  ) {
  }

  getItemList() {
    let cart = this._cartService.getCart()
    let itemIds = Object.keys(cart)

    itemIds.forEach(id => {
      this._itemService.getItem(Number (id)).subscribe({
        next: (val: ItemDTO) => {
          this.dataSource.push(val)
          console.log(this.dataSource)
        },
        error: console.error
      })
    })
  }

}
