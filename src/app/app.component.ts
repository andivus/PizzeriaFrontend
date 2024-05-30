import {Component} from '@angular/core';
import {CartDialogComponent} from "./components/cart-dialog/cart-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CartService} from "./service/cart.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "./service/user.service";
import {DataSharingService} from "./service/data-sharing-service";
import {Router} from "@angular/router";
import UserDTO from "./model/user-dto";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pizzeria';
  isAuthenticated = false
  userDTO: UserDTO | null = null

  constructor(
    private _dialog: MatDialog,
    private _cartService: CartService,
    private _snackBar: MatSnackBar,
    private _userService: UserService,
    private _dataSharingService: DataSharingService,
    private _router: Router,
  ) {
  }

  async ngOnInit(): Promise<void> {
    const tokenValid = await this._userService.isTokenValid()
    this._dataSharingService.isUserLoggedIn.next(tokenValid != null)

    if (tokenValid != null && tokenValid.userId != null)
      this._dataSharingService.userDTO.next(await this._userService.getUser(tokenValid.userId))

    this.userDTO = this._dataSharingService.userDTO.value

    this._dataSharingService.isUserLoggedIn.subscribe( value => {
      this.isAuthenticated = value;
    });

    this._dataSharingService.userDTO.subscribe( value => {
      this.userDTO = value;
    });
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

  async logout() {
    this._userService.logout().then(r => {
      sessionStorage.removeItem("token")
      this._dataSharingService.isUserLoggedIn.next(false)
      this._router.navigateByUrl('/')
      this.userDTO = null
    })

  }
}
