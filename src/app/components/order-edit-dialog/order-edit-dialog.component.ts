import {Component, Inject} from '@angular/core';
import {DataSharingService} from "../../service/data-sharing-service";
import {UserService} from "../../service/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import OrderDTO from "../../model/order-dto";
import {OrderService} from "../../service/order.service";

@Component({
    selector: 'order-edit-page',
    templateUrl: './order-edit-dialog.component.html',
    styleUrl: './order-edit-dialog.component.scss'
})
export class OrderEditDialogComponent {
    orderDTO: null | OrderDTO = null
    orderForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<OrderEditDialogComponent>,
        private _dataSharingService: DataSharingService,
        private _fb: FormBuilder,
        private _orderService: OrderService,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.orderForm = this._fb.group({
            firstName: "",
            email: "",
            phone: "",
            city: "",
            firstAddress: "",
            status: "",
        })
    }

    onNoClick(): void {
        this.dialogRef.close(false);
    }

    onSubmitClick(): void {
        if (this.data == null) return

        this._orderService.updateOrder(this.data.uuid, this.orderForm.value).then(r => {
            if (r == null) {
                this._snackBar.open(`Виникла помилка!`, 'Окей', {
                    duration: 5000
                });
                return
            }

            this.dialogRef.close(true);
            this._snackBar.open(`Замовлення успішно оновлено!`, 'Окей', {
                duration: 5000
            });
        })

    }

    ngOnInit() {
        this.orderForm.patchValue(this.data)
    }


}
