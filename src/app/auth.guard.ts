import {Injectable} from "@angular/core";
import {UserService} from "./service/user.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {DataSharingService} from "./service/data-sharing-service";

@Injectable()
export class AuthGuard {

  constructor(
    public _userService: UserService,
    public _router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (localStorage.getItem("token") == null) return false

    let tokenResponse = this._userService.isTokenValid()

    if (tokenResponse == null) {
      localStorage.removeItem("token")
      return false
    }

    return true
  }
}
