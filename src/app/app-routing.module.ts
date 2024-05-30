import { NgModule } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {ItemAdminPageComponent} from "./pages/item-admin-page/item-admin-page.component";
import {ItemMenuComponent} from "./components/item-menu/item-menu.component";
import {OrdersComponent} from "./pages/orders-page/orders.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {AuthGuard} from "./auth.guard";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {UsersPageComponent} from "./pages/users-page/users-page.component";
import {UserPageComponent} from "./pages/user-page/user-page.component";

const routes: Routes = [
  {
    path: '',
    component: ItemMenuComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  // {
  //   path: 'items',
  //   component: ItemMenuComponent
  // },
  {
    path: "admin/items",
    component: ItemAdminPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/orders',
    component: OrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/users',
    component: UsersPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/:id',
    component: UserPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
