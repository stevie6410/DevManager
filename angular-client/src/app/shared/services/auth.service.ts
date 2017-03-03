import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';

import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

import { UserIdentity, AccessToken, LoginCredential, UserInfo } from '../models/auth.models';
import { AppConfigService } from './app-config.service';
import { AppConfig } from '../models/app-config.models';
import { serialize } from '../shared.functions';

@Injectable()
export class AuthService {

  _user: UserInfo;
  private _jwt: JwtHelper;
  private baseUrl: string;
  private autoRefreshSession: boolean = true;
  private loginEventsSource = new Subject<any>();
  private sessionTimer: any;
  private appConfig: AppConfig;

  //Observable string stream
  loginEvent = this.loginEventsSource.asObservable();

  redirectUrl: string;

  constructor(private http: Http, private router: Router, private appConfigService: AppConfigService) {
    this.appConfigService.getAppData().subscribe(
      data => {
        this.appConfig = data;
        console.log(this.appConfig);
        console.log(this.appConfig.IdentityServerUrl);
        this.baseUrl = this.appConfig.IdentityServerUrl;
        this._jwt = new JwtHelper();
        if (this.isAuthenticated && this._user != null) {
          this.loginEventsSource.next("logged_in");
        }
        this.startSessionTimeoutEvents();
        this.refreshSession();
      },
      err => { });
  }

  get user(): UserInfo {
    // //console.log("User info requested", this._user);
    return this._user;
  }

  private accessTokenSettings(creds: LoginCredential) {
    var body: any = {
      client_id: "dev-manager-angular",
      client_secret: "secret",
      grant_type: "password",
      scope: "openid bedefault offline_access",
      username: creds.username,
      password: creds.password
    };
    return body;
  }

  private refreshTokenSettings(refreshToken: string) {
    var body: any = {
      client_id: "dev-manager-angular",
      client_secret: "secret",
      grant_type: "refresh_token",
      refresh_token: refreshToken
    };
    return body;
  }

  login(creds: LoginCredential): Observable<any> {
    return Observable.create(observer => {
      let headers = new Headers({ "content-type": "application/x-www-form-urlencoded" });
      let options = new RequestOptions({ headers: headers });
      let access_token: any;
      //console.debug("Logging in");
      var apiMethodUrl: string = this.baseUrl + 'connect/token';

      console.log(apiMethodUrl);

      this.http.post(apiMethodUrl, serialize(this.accessTokenSettings(creds)), options)
        .map((r: Response) => r.json())
        .subscribe(
        data => {
          access_token = data;
          localStorage.setItem("access_token", access_token.access_token);
          localStorage.setItem("refresh_token", access_token.refresh_token);
          //Get the new user details and send out a login event with the user details
          this.startSessionTimeoutEvents();
          if (this._user == null) {
            //Need to get the user
            this.getUserInfo().subscribe(
              userInfo => {
                this._user = userInfo
                observer.next(data);
                observer.complete();
                this.loginEventsSource.next("logged_in")
              },
              null, null);
          } else {
            observer.next(data);
            observer.complete();
            this.loginEventsSource.next("logged_in")
          }
        },
        err => {
          observer.error(err);
        },
        () => {
        });
    });
  }

  refreshSession(): Observable<any> {
    //console.debug("Refreshing Session");
    return Observable.create(observer => {
      let headers = new Headers({ "content-type": "application/x-www-form-urlencoded" });
      let options = new RequestOptions({ headers: headers });
      let access_token: any;
      this.http.post(this.baseUrl + "connect/token", serialize(this.refreshTokenSettings(this.RefreshToken)), options)
        .map((r: Response) => r.json())
        .catch((error) => {
          //console.debug("There was an error while trying to refresh the token. Logging out");
          this.logout();
          return this.handleError(error);
        })
        .subscribe(
        data => {
          access_token = data;
          localStorage.setItem("access_token", access_token.access_token);
          localStorage.setItem("refresh_token", access_token.refresh_token);
          this.startSessionTimeoutEvents();
          if (this._user == null) {
            //Need to get the user
            this.getUserInfo().subscribe(
              userInfo => {
                this._user = userInfo
                observer.next(data);
                observer.complete();
                this.loginEventsSource.next("logged_in")
              },
              null, null);
          } else {
            observer.next(data);
            observer.complete();
            this.loginEventsSource.next("logged_in")
          }
        },
        err => {
          observer.error(err);
        },
        () => { })
    });
  }

  redirectToLogin() {
    this.router.navigate(["login"]);
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    errMsg += " - " + (error._body);
    //console.error(errMsg, error); // log to console instead
    return Observable.throw(errMsg);
  }

  logout() {
    this.clearLocalStorage();
    this._user = null;
    this.stopSessionTimeoutEvents();
    this.loginEventsSource.next("logged_out");
    this.router.navigate(["login"]);
  }

  clearLocalStorage() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    //console.debug("Local storage cleared");
  }

  get isAuthenticated(): boolean {
    try {
      return tokenNotExpired("access_token");
    } catch (error) {
      return false;
    }
  }

  startSessionTimeoutEvents() {
    var access_token: string = this.AccessToken;
    if (access_token) {
      var expireAt: number = this._jwt.getTokenExpirationDate(access_token).getTime();
      var timeoutRemaining: number = (expireAt - new Date().getTime());

      this.sessionTimer = setTimeout(() => {
        this.refreshSession().subscribe();
      }, timeoutRemaining - 15000);
    }
  }

  stopSessionTimeoutEvents() {
    clearInterval(this.sessionTimer);
  }

  get SessionTimeRemaining(): number {
    var access_token: string = this.AccessToken;
    if (access_token) {
      var expireAt: number = this._jwt.getTokenExpirationDate(access_token).getTime();
      var timeLeft: number = Math.round((expireAt - new Date().getTime()) / 1000);
      return (timeLeft < 0) ? 0 : timeLeft;
    } else {
      return 0;
    }
  }

  get AccessToken(): string {
    var token: string = localStorage.getItem("access_token");
    //check to see if the access token in storage is a valid JWT else return null
    try {
      if (this._jwt.isTokenExpired(token) != null) return token;
    } catch (error) {
      return null;
    }
    return localStorage.getItem("access_token");
  }

  get RefreshToken(): string {
    return localStorage.getItem("refresh_token");
  }



  debugToken(): any {
    // var access_token: string = this.AccessToken;
    // if (access_token) {
    //   try {
    //     //console.debug("Decoded Token", this._jwt.decodeToken(access_token));
    //     //console.debug("Expiration", this._jwt.getTokenExpirationDate(access_token));
    //     //console.debug("Token Expired", this._jwt.isTokenExpired(access_token));
    //   } catch (error) {
    //     //console.debug("Invalid JWT Token", access_token);
    //   }
    // }
    // else {
    //   //console.debug("Access Token does not exist in local storage");
    // }
  }

  getUserInfo(): Observable<UserInfo> {
    let accessToken: string = this.AccessToken;
    if (accessToken != null) {
      let headers = new Headers({ "Authorization": "Bearer " + accessToken });
      let options: RequestOptions = new RequestOptions({ headers: headers });

      return this.http.get(this.baseUrl + "connect/userinfo", options)
        .map(data => data.json());
    } else {
      return Observable.create(observer => { observer.next(null); observer.complete(); });
    }
  }
}
