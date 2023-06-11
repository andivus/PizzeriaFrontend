import {Component, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddEditItemComponent} from "./add-edit-item/add-edit-item.component";
import {ItemService} from "./service/item.service";
import ItemDTO from "./model/item-dto";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pizzeria';

  displayedColumns: string[] = ['id', 'image', 'name', 'price', 'stock', 'isActive', 'editButton'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _itemService: ItemService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getItemList()

  }

  openAddItemDialog(): void {
    const dialogRef = this._dialog.open(AddEditItemComponent, {
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
    const dialogRef = this._dialog.open(AddEditItemComponent, {
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
