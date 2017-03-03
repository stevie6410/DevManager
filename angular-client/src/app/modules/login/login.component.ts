import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';
import { LoginCredential, AccessToken } from '../../shared/models/auth.models';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ["login.component.css"]
})
export class LoginComponent implements OnInit {

    creds: LoginCredential = new LoginCredential();
    isLoggingIn: boolean = false;
    loginFailed: boolean = false;
    title: string = "Login";
    
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.checkForRefreshToken();
    }

    login() {
        this.isLoggingIn = true;
        this.loginFailed = false;

        this.authService.login(this.creds)
            .subscribe(
            data => {
                console.log("login comp says login completed");
                this.loginFailed = false;
                this.isLoggingIn = false;
                this.redirect();
            },
            err => {
                console.log("login comp says login failed");
                this.loginFailed = true;
                this.isLoggingIn = false;
            },
            () => {
            });
    }

    redirect() {
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : "dashboard";
        if (redirect != null) {
            console.debug("Redirecting to: ", redirect);
            this.router.navigate([redirect]);
        }
    }

    logout() {
        this.authService.logout();
    }

    checkForRefreshToken() {
        if (this.authService.RefreshToken) {
            this.isLoggingIn = true;
            this.loginFailed = false;
            this.authService.refreshSession().subscribe(
                data => {
                    console.debug("Access token refreshed");
                    this.loginFailed = false;
                    this.isLoggingIn = false;
                },
                err => {
                    // this.loginFailed = true;
                    this.isLoggingIn = false;
                },
                () => {
                    this.redirect();
                }
            );
        }
    }
}