import {Component, ViewChild} from '@angular/core';
import UserDTO from "../../model/user-dto";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../service/user.service";
import {UserEditDialogComponent} from "../../components/user-edit-dialog/user-edit-dialog.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent {
  displayedColumns: string[] = ['uuid', 'username', 'firstName', 'secondName', 'email', 'editButtons'];
  dataSource!: MatTableDataSource<UserDTO>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
      private _dialog: MatDialog,
      private _snackBar: MatSnackBar,
      private _userService: UserService
  ) {
  }

  async ngOnInit() {
    this.getUserList()
  }

  openAddDialog(): void {
    const dialogRef = this._dialog.open(UserEditDialogComponent, {
      width: '600px',
    })

    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.getUserList()
        }
      }
    })
  }

  openEditDialog(data: any) {
    const dialogRef = this._dialog.open(UserEditDialogComponent, {
      width: '600px',
      data
    })

    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.getUserList()
        }
      }
    })
  }

  getUserList() {
    this._userService.getAllUsers().then((val: Array<UserDTO>) => {
      this.dataSource = new MatTableDataSource<UserDTO>(val);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }).catch(error => {
      console.error(error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDeleteClick(uuid: string, user: string): void {
    if (this.dataSource.data.length <= 1) {
      this._snackBar.open(`Помилка! Ви єдиний користувач.`, 'Окей', {
        duration: 7500
      })
      return
    }

    this._snackBar.open(`Ви впенені, що бажаєте видалити користувача ${user}?`, 'Так', {
      duration: 7500
    }).onAction().subscribe(() => {
      this.deleteItem(uuid)
    })
  }

  deleteItem(uuid: string): void {
    this._userService.removeUser(uuid)
        .then((val: UserDTO | null) => {
          if (val !== null) {
            this.getUserList();
            this._snackBar.open(`Користувача #${val.username} успішно видалено!`, 'Окей', {
              duration: 5000
            });
          } else {
            this._snackBar.open('Користувача не знайдено для видалення!', 'Окей', {
              duration: 5000
            });
          }
        })
        .catch((error: any) => {
          this._snackBar.open('Виникла помилка при видаленні користувача!', 'Окей', {
            duration: 5000
          });
          console.error(error);
        });
  }

}
