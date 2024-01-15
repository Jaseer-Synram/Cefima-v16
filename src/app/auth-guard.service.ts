import { Injectable } from '@angular/core';
//import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    public auth: AuthService,
    private userService: UserService,
    public router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);

    const UserType = localStorage.getItem('UserType');
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['./login']);
      return false;
    }
    if (UserType == 'NormalUser') {
      // check if route is restricted by role
      const loggedInUserRoles = currentUser['roles'];
      var shouldAllow: Boolean = false;
      loggedInUserRoles.forEach(function (role: any) {
        const totalRoles = route.data['roles'].length;
        const index = route.data['roles'].indexOf(role);

        if (index > -1 && index < totalRoles && shouldAllow == false) {
          shouldAllow = true;
        }
      });

      if (shouldAllow) {
        return true;
      } else {
        return false;
        shouldAllow = true;
        console.log('redirect');
      }
    }

    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['./login']);
      return false;
    }

    return true;
  }
}
