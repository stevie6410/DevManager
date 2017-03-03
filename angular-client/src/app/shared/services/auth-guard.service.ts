import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let url: string = state.url;
        return this.checkLogin(url);
    }

    checkLogin(url: string) {

        return true;

        // let isAuth: boolean = this.authService.isAuthenticated;
        // //console.debug("Checking login access to " + url, this.authService.debugToken());

        // if (isAuth && this.authService._user) {
        //     console.debug("Is Authenticated");
        //     return true;
        // } else {
        //      console.debug("Not Authenticated");
        //     //Store attempted URL for redirecting
        //     // console.debug("Redirect URL saved", url);
        //     this.authService.redirectUrl = url;
        //     //Navigate to the login page with extras
        //     // console.debug("Redirecting to login screen");
        //     this.router.navigate(["/login"]);
        //     return false;
        // }
    }
}
