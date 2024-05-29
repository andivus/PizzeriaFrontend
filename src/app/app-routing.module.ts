import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ItemAdminPageComponent} from "./item-admin-page/item-admin-page.component";
import {ItemMenuComponent} from "./item-menu/item-menu.component";
import {OrdersComponent} from "./orders/orders.component";

const routes: Routes = [
  {
    path: "admin/items",
    component: ItemAdminPageComponent
  },
  {
    path: 'items',
    component: ItemMenuComponent
  },
  {
    path: 'admin/orders',
    component: OrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
