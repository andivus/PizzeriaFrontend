import { Component } from '@angular/core';
import UserDTO from "../../model/user-dto";
import {DataSharingService} from "../../service/data-sharing-service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {UserEditDialogComponent} from "../../components/user-edit-dialog/user-edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-users-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent {
  userDTO: null | UserDTO = null
  id: string | null = null

  constructor(
    private _dialog: MatDialog,
    private _dataSharingService: DataSharingService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
  }

  async ngOnInit() {
    this.id = this._route.snapshot.paramMap.get('id')
    this.userDTO = this._dataSharingService.userDTO.value

    if (this.userDTO?.uuid == this.id) {
      this._dataSharingService.userDTO.subscribe(value => {
        this.userDTO = value;
      });
    } else {
      if (this.id == null) this._router.navigateByUrl('/')

      this.userDTO = await this._userService.getUser(this.id!!)
    }
  }

    openEditDialog(data: UserDTO | null) {
        const dialogRef = this._dialog.open(UserEditDialogComponent, {
            width: '600px',
            data
        })

        dialogRef.afterClosed().subscribe({
            next: (value: UserDTO) => {
                if (value) {
                    this.userDTO = value
                }
            }
        })
    }

}
