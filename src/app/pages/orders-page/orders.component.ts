import {Component, ViewChild} from '@angular/core';
import {UtilsService} from "../../service/utils.service";
import OrderDTO from "../../model/order-dto";
import {OrderService} from "../../service/order.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {formatDate} from "@angular/common";
import {ItemAddEditDialogComponent} from "../../components/item-add-edit-dialog/item-add-edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {OrderEditDialogComponent} from "../../components/order-edit-dialog/order-edit-dialog.component";
import {OrderItemsDialogComponent} from "../../components/order-items-dialog/order-items-dialog.component";

@Component({
  selector: 'orders-page',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  displayedColumns: string[] = ['uuid', 'purchaseDate', 'status', 'firstName', 'phone', 'city', 'totalPrice', 'editButtons'];
  dataSource!: MatTableDataSource<OrderDTO>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _orderService: OrderService,
    public _utilsService: UtilsService,
    private _dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getOrderList()
  }

  getOrderList() {
    this._orderService.getOrders().subscribe({
      next: (val: Array<OrderDTO>) => {
        val = val
          .sort((a: OrderDTO, b: OrderDTO) => {return new Date(b.purchaseDate).getDate() - new Date(a.purchaseDate).getDate()})
          .sort((a: OrderDTO, b: OrderDTO) => {return new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime()})
          .sort((a: OrderDTO, b: OrderDTO) => a.status == "PAID" ? 1 : 0)

        this.dataSource = new MatTableDataSource<OrderDTO>(val)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      },
      error: console.error
    })
  }

  getHumanOrderStatus(status: string): string {
    if (status == "UNPAID") return "Очікує оплати"
    if (status == "PAID") return "Оплачене"
    if (status == "CANCELED") return "Скасоване"
    if (status == "DONE") return "Виконане"
    if (status == "PROCESSING") return "Оброблюється"

    return status;
  }

  getHumanDate(date: string): string {
    return formatDate(new Date(date), 'dd.MM.yyyy HH:mm', 'en-US')
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editOrder(data: OrderDTO) {
    const dialogRef = this._dialog.open(OrderEditDialogComponent, {
      width: '600px',
      data
    })

    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.getOrderList()
        }
      }
    })
  }

  showOrder(data: OrderDTO) {
    const dialogRef = this._dialog.open(OrderItemsDialogComponent, {
      width: '600px',
      data
    })
  }

  protected readonly Date = Date;
}
