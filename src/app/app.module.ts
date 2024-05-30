import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {ItemAddEditDialogComponent} from './components/item-add-edit-dialog/item-add-edit-dialog.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatChipsModule} from "@angular/material/chips";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {ItemAdminPageComponent} from './pages/item-admin-page/item-admin-page.component';
import {ItemUserDialogComponent} from './components/item-user-dialog/item-user-dialog.component';
import {ItemMenuComponent} from './components/item-menu/item-menu.component';
import {MatCardModule} from "@angular/material/card";
import {CartDialogComponent} from './components/cart-dialog/cart-dialog.component';
import {OrdersComponent} from "./pages/orders-page/orders.component";
import {OrderInfoDialogComponent} from "./components/order-info-dialog/order-info.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {AuthGuard} from "./auth.guard";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {DataSharingService} from "./service/data-sharing-service";
import {UsersPageComponent} from "./pages/users-page/users-page.component";
import {UserPageComponent} from "./pages/user-page/user-page.component";
import {UserEditDialogComponent} from "./components/user-edit-dialog/user-edit-dialog.component";
import {OrderEditDialogComponent} from "./components/order-edit-dialog/order-edit-dialog.component";
import {MatSelect} from "@angular/material/select";
import {OrderItemsDialogComponent} from "./components/order-items-dialog/order-items-dialog.component";

@NgModule({
    declarations: [
        AppComponent,
        ItemAddEditDialogComponent,
        ItemAdminPageComponent,
        ItemUserDialogComponent,
        ItemMenuComponent,
        CartDialogComponent,
        OrdersComponent,
        OrderInfoDialogComponent,
        LoginPageComponent,
        HomePageComponent,
        UsersPageComponent,
        UserPageComponent,
        UserEditDialogComponent,
        OrderEditDialogComponent,
        OrderItemsDialogComponent
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
        MatCardModule,
        MatSelect
    ],
    providers: [AuthGuard, DataSharingService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
