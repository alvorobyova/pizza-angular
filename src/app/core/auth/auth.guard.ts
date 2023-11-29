import {
  ActivatedRouteSnapshot, CanActivate,
  CanActivateFn, Router,
  RouterStateSnapshot, UrlTree
} from '@angular/router';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if(this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/'])
      return false;
    }
  }
}


/*export const authGuard: CanActivateFn = (route, state) => {
  return true;
};*/
