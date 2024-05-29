import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import { ItemAddEditDialogComponent } from './item-add-edit-dialog/item-add-edit-dialog.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatChipsModule} from "@angular/material/chips";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { ItemAdminPageComponent } from './item-admin-page/item-admin-page.component';
import { ItemUserDialogComponent } from './item-user-dialog/item-user-dialog.component';
import { ItemMenuComponent } from './item-menu/item-menu.component';
import {MatCardModule} from "@angular/material/card";
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';
import {OrdersComponent} from "./orders/orders.component";
import {OrderInfoDialogComponent} from "./order-info-dialog/order-info.component";

@NgModule({
  declarations: [
    AppComponent,
    ItemAddEditDialogComponent,
    ItemAdminPageComponent,
    ItemUserDialogComponent,
    ItemMenuComponent,
    CartDialogComponent,
    OrdersComponent,
    OrderInfoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatSlideToggleModule,
    MatChipsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
