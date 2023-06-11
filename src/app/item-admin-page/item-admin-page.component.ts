import {Component, ViewChild} from '@angular/core';
import {ItemAddEditDialogComponent} from "../item-add-edit-dialog/item-add-edit-dialog.component";
import ItemDTO from "../model/item-dto";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {ItemService} from "../service/item.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ItemUserDialogComponent} from "../item-user-dialog/item-user-dialog.component";
import {UtilsService} from "../service/utils.service";

@Component({
  selector: 'app-item-admin-page',
  templateUrl: './item-admin-page.component.html',
  styleUrls: ['./item-admin-page.component.scss']
})
export class ItemAdminPageComponent {

  displayedColumns: string[] = ['id', 'image', 'name', 'price', 'stock', 'isActive', 'editButtons'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _itemService: ItemService,
    private _snackBar: MatSnackBar,
    public _utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.getItemList()
  }

  openAddItemDialog(): void {
    const dialogRef = this._dialog.open(ItemAddEditDialogComponent, {
      width: '600px',
    })

    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.getItemList()
        }
      }
    })
  }

  openEditItemDialog(data: any) {
    const dialogRef = this._dialog.open(ItemAddEditDialogComponent, {
      width: '600px',
      data
    })

    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.getItemList()
        }
      }
    })
  }

  openItemUserDialog(data: any): void {
    this._dialog.open(ItemUserDialogComponent, {
      width: '800px',
      data
    })
  }

  getItemList() {
    this._itemService.getItems().subscribe({
      next: (val: Array<ItemDTO>) => {
        val.sort((a, b) => a.id - b.id)
        this.dataSource = new MatTableDataSource<any>(val)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      },
      error: console.error
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDeleteClick(id: number): void {
    this._snackBar.open(`Ви впенені, що бажаєте видалити товар #${id}?`, 'Так', {
      duration: 7500
    }).onAction().subscribe(() => {
      this.deleteItem(id)
    })
  }

  deleteItem(id: number): void {
    this._itemService.removeItem(id).subscribe({
      next: (val: ItemDTO) => {
        this.getItemList()
        this._snackBar.open(`Товар #${val.id} успішно видалено!`, 'Окей', {
          duration: 5000
        });
      },
      error: (val: any) => {
        this._snackBar.open('Виникла помилка при видаленні товару!', 'Окей', {
          duration: 5000
        });
        console.error(val)
      }
    })
  }
}
