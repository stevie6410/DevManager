import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";

import { LoginCredential } from '../models/auth.models';

@Injectable()
export class JiraAuthService {

    private jiraAuthUrl: string = "http://sao.beav.com:8080/rest/auth/1/session";

    constructor(private _http: Http) {

    }

    isAuthenticated(): any {

        var res: any;

        // var customHeaders = new Headers();
        // customHeaders.append("Origin", "http://sao.beav.com:8080");
        // customHeaders.append("Steve","Denise");

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });


        this._http.get(this.jiraAuthUrl, options)
            .map((r: Response) => r.json())
            .subscribe(
            data => res = data,
            err => console.log(err),
            () => {
                return res;
            }
            );
    }

    login() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        var creds: LoginCredential = new LoginCredential();
        creds.username = "kents";
        creds.password = "Sp4tfire";

        var loginBody = JSON.stringify(creds);

        console.log(loginBody);

        this._http.post(this.jiraAuthUrl, loginBody, options)
            .map((r: Response) => r.json())
            .subscribe(
            data => console.warn(data),
            err => console.warn(err),
            () => console.warn("Login Done!")
            );
    }
}