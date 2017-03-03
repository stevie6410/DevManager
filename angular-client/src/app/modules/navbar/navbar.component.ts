import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { UserIdentity } from '../../shared/models/auth.models';
import { AuthService } from '../../shared/services/auth.service';
import { AppConfigService } from '../../shared/services/app-config.service';
import { AppConfig } from '../../shared/models/app-config.models';

@Component({
    selector: 'navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit {

    sidebarIsVisible: boolean = true;
    user: any = null;
    sessionTimeRemaining: number = 0;
    appConfig: AppConfig;

    @Output() sidebarVisibilityChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        private authService: AuthService,
        private AppConfigService: AppConfigService
    ) { }

    ngOnInit() {
        //Get the app config object from the service
        this.AppConfigService.getAppData().subscribe(data => {
            this.appConfig = data;
            //Subscribe to the login events
            this.authService.loginEvent.subscribe(loginEvent => { this.handleLoginEvent(loginEvent); });
            //Start updating the timer for session timeout
            this.startUpdating();
        });
    }

    toggleSidebar() {
        this.sidebarIsVisible = this.sidebarIsVisible ? false : true;
        this.sidebarVisibilityChanged.emit(this.sidebarIsVisible);
    }

    logout() {
        this.authService.logout();
    }

    handleLoginEvent(loginArgs: any) {
        if (loginArgs == "logged_in") {
            this.user = this.authService.user;
        }
        if (loginArgs == "logged_out") {
            this.user = null;
        }
    }

    refreshToken() {
        this.authService.refreshSession();
    }

    debugAuth() {
        this.authService.debugToken();
    }

    debugUser() {
        console.debug("Debug AuthService.User", this.authService.user);
        console.debug("Debug AuthService._User", this.authService._user);
    }

    startUpdating() {
        setInterval(() => {
            this.sessionTimeRemaining = this.authService.SessionTimeRemaining;
        }, 1000);
    }
}