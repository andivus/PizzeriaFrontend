import { Component } from '@angular/core';
import ItemDTO from "../../model/item-dto";
import {ItemService} from "../../service/item.service";
import {ItemUserDialogComponent} from "../item-user-dialog/item-user-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CartService} from "../../service/cart.service";
import {UtilsService} from "../../service/utils.service";

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.scss']
})
export class ItemMenuComponent {

  dataSource!: Array<ItemDTO>;

  constructor(
    private _itemService: ItemService,
    private _dialog: MatDialog,
    public _cartService: CartService,
    public _utilsService: UtilsService
  ) {
  }

  ngOnInit(): void {
    this.getItemList()
  }

  getItemList() {
    this._itemService.getItems().subscribe({
      next: (val: Array<ItemDTO>) => {
        let filteredItems = val.filter(item => item.isActive)
        filteredItems.sort((a, b) => b.stock - a.stock)
        this.dataSource = filteredItems
      },
      error: console.error
    })
  }

  openItemUserDialog(data: any): void {
    this._dialog.open(ItemUserDialogComponent, {
      width: '800px',
      data
    })
  }
}
