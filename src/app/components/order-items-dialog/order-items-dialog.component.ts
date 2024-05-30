import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import OrderDTO, {OrderItem} from "../../model/order-dto";
import {OrderService} from "../../service/order.service";
import {UtilsService} from "../../service/utils.service";

@Component({
    selector: 'order-items-page',
    templateUrl: './order-items-dialog.component.html',
    styleUrl: './order-items-dialog.component.scss'
})
export class OrderItemsDialogComponent {
    dataSource: OrderItem[] = []

    constructor(
        public dialogRef: MatDialogRef<OrderItemsDialogComponent>,
        public _utilsService: UtilsService,
        private _orderService: OrderService,
        @Inject(MAT_DIALOG_DATA) public data: OrderDTO
    ) {

    }

    onClick(): void {
        this.dialogRef.close(false);
    }

    async ngOnInit() {
        this.dataSource = await this._orderService.getOrderItems(this.data.uuid)
    }


}
