import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ItemService} from "../../service/item.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UtilsService} from "../../service/utils.service";
import {UserService} from "../../service/user.service";
import {UserLoginRequest} from "../../model/user-dto";
import {Router} from "@angular/router";
import {DataSharingService} from "../../service/data-sharing-service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  loginForm = new FormGroup({
    login: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    public _userService: UserService,
    public _itemService: ItemService,
    private _snackBar: MatSnackBar,
    public _utilsService: UtilsService,
    private _router: Router,
    private _dataSharingService: DataSharingService
  ) {
  }

  async onSubmit() {
    let loginRequest: UserLoginRequest = {
      login: this.loginForm.value.login,
      password: this.loginForm.value.password
    }

    let loginResponse = await this._userService.login(loginRequest)

    if (loginResponse == null) {
      this._snackBar.open(`Неправильно введені дані!`, 'Окей', {
        duration: 60000
      })
      return
    }

    sessionStorage.setItem("token", loginResponse.token)

    this._dataSharingService.isUserLoggedIn.next(true)
    this._dataSharingService.userDTO.next(loginResponse.userDTO)

    this._snackBar.open(`Ви успішно увійшли!`, 'Окей', {
      duration: 5000
    });

    await this._router.navigateByUrl('/')
  }
}
