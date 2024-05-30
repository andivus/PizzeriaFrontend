import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {CartService} from "../../service/cart.service";
import ItemDTO from "../../model/item-dto";
import {ItemService} from "../../service/item.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UtilsService} from "../../service/utils.service";
import {FormControl, FormGroup} from "@angular/forms";
import OrderDTO, {CreateOrderRequest, StatusType} from "../../model/order-dto";

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.scss']
})
export class CartDialogComponent {

  dataSource!: Array<ItemDTO>;

  cartForm = new FormGroup({
  firstName: new FormControl(),
  phone: new FormControl(),
  email: new FormControl(),
  city: new FormControl(),
  firstAddress: new FormControl(),
});

  ngOnInit(): void {
    this.getItemList()
    this.dataSource = []
  }

  constructor(
    public dialogRef: MatDialogRef<CartDialogComponent>,
    public _cartService: CartService,
    public _itemService: ItemService,
    private _snackBar: MatSnackBar,
    public _utilsService: UtilsService
  ) {
  }

  getItemList() {
    let cart = this._cartService.getCart()
    let itemIds = Object.keys(cart)

    itemIds.forEach(id => {
      this._itemService.getItem(Number (id)).subscribe({
        next: (val: ItemDTO) => {
          if (!val.isActive || val.stock == 0) {
            this._cartService.removeFullFromCart(val.id)
            this._snackBar.open("Деякі товари з вашої корзини закінчились та були видалені з вашої корзини", "Окей", {
              duration: 10000
            })
            return
          }
          if (val.stock < cart[val.id]) {
            this._cartService.setToCart(val.id, val.stock)
            this._snackBar.open("Деяких товарів з вашої корзини нема у такій кількості", "Окей", {
              duration: 10000
            })
          }
          this.dataSource.push(val)
        },
        error: console.error
      })
    })
  }

  getTotalPrice(): number {
    let result = 0
    this.dataSource.forEach(item => {
      let cart = this._cartService.getCart()
      result += cart[item.id]*item.price
    })
    return result
  }

  onSubmitClick(): void {

    if (!this.cartForm.valid ||
      this.cartForm.value.firstName == null ||
      this.cartForm.value.phone == null ||
      this.cartForm.value.email == null ||
      this.cartForm.value.city == null ||
      this.cartForm.value.firstAddress == null
    ) {
      this._snackBar.open('Халепа! Перевірте правильність введених даних', 'Окей', {
        duration: 5000
      });
      return;
    }

    let order: CreateOrderRequest = {
      firstName: this.cartForm.value.firstName,
      phone: this.cartForm.value.phone,
      email: this.cartForm.value.email,
      city: this.cartForm.value.city,
      firstAddress: this.cartForm.value.firstAddress,
      cart: this._cartService.getCart(),
    }

      this._cartService.createOrder(order).subscribe({
        next: (val: OrderDTO) => {
          this.dialogRef.close(true);
          this._snackBar.open(`Замовлення успішно оформлено!`, 'Окей', {
            duration: 5000
          });
          sessionStorage.removeItem("cart")
        },
        error: (val: StatusType) => {
          let status = "Інше"
          if (val == StatusType.NO_ENOUGH_ITEMS) status = "Недостатньо інгридієнтів"
          if (val == StatusType.ITEM_NOT_FOUND) status = "Товар з вашої корзини не знайдено"
          if (val == StatusType.CART_IS_EMPTY) status = "Корзина пуста"
          this._snackBar.open(`Виникла помилка при оформленні замовлення: ${status}`, 'Окей', {
            duration: 60000
          });
          console.error(val)
        }
      })
      return;

  }
}
