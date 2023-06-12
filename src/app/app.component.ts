import {Component} from '@angular/core';
import {CartDialogComponent} from "./cart-dialog/cart-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CartService} from "./service/cart.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pizzeria';

  constructor(
    private _dialog: MatDialog,
    private _cartService: CartService,
    private _snackBar: MatSnackBar
  ) {
  }

  openItemUserDialog(): void {
    if (!this._cartService.hasItems()) {
      this._snackBar.open("Корзина пуста!", 'Окей', {
        duration: 5000
      })
      return
    }
    this._dialog.open(CartDialogComponent, {
      width: '900px'
    })
  }
}
