import { Component, OnInit } from '@angular/core';

import { Http, Request, Response } from '@angular/http';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ["dashboard.component.css"]
})
export class DashboardComponent implements OnInit {

    constructor(
        private http: Http
    ) {

    }

    ngOnInit() {
        this.http.get('http://sao.beav.com:8080/rest/api/2/search?jql=key="SAORPT-618"')
        .map((res: Response) => {
            return res.json();
        })
        .subscribe(
            (data: any) => {
                console.log(data);
            }
        );
    }
}