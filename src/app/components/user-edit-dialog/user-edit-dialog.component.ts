import {Component, Inject} from '@angular/core';
import UserDTO from "../../model/user-dto";
import {DataSharingService} from "../../service/data-sharing-service";
import {UserService} from "../../service/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import ItemDTO from "../../model/item-dto";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-user-edit-dialog',
    templateUrl: './user-edit-dialog.component.html',
    styleUrl: './user-edit-dialog.component.scss'
})
export class UserEditDialogComponent {
    userDTO: null | UserDTO = null
    userForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<UserEditDialogComponent>,
        private _dataSharingService: DataSharingService,
        private _fb: FormBuilder,
        private _userService: UserService,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.userForm = this._fb.group({
            username: "",
            firstName: "",
            secondName: "",
            email: "",
            password: "",
        })
    }

    onNoClick(): void {
      this.dialogRef.close(false);
    }

    onSubmitClick(): void {
      if (this.data != null) {
          this._userService.updateUser(this.data.uuid, this.userForm.value).then(r => {
              if (r.status != null) {
                  this._snackBar.open(`Виникла помилка: ${r.status}`, 'Окей', {
                      duration: 5000
                  });
                  return
              }

              this.dialogRef.close(true);
              this._snackBar.open(`Користувача ${r.userDTO?.username} успішно оновлено!`, 'Окей', {
                  duration: 5000
              });
          })
          return
      }

        this._userService.createUser(this.userForm.value).then(r => {
            if (r.status != null) {
                this._snackBar.open(`Виникла помилка: ${r.status}`, 'Окей', {
                    duration: 5000
                });
                return
            }

            this.dialogRef.close(true);
            this._snackBar.open(`Користувач ${r.userDTO?.username} успішно створений!`, 'Окей', {
                duration: 5000
            });
        })
    }

    ngOnInit() {
        this.userForm.patchValue(this.data)
    }


}
