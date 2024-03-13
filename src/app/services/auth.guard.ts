import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isAuthenticatedUser: boolean = false;
  constructor(
    private router: Router,
    private authenService: AuthenticationService
  ) {
    this.authenService.authChanged.subscribe((rs) => {
      this.isAuthenticatedUser = rs;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.isAuthenticatedUser) {
      return true;
    } else {
      return this.router.parseUrl('/access-denied');
    }
  }
}
