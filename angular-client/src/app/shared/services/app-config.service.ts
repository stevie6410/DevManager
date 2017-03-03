import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Observer } from 'rxjs/Rx';

import { environment } from '../../../environments/environment';
import { AppConfig } from '../models/app-config.models';

@Injectable()
export class AppConfigService {

    private _appConfig: AppConfig;

    constructor(
        private http: Http
    ) {

    }

    getAppData(): Observable<AppConfig> {
        if (environment.production) {
            return this.http.request('./assets/appConfig.json').map(res => res.json());
        }
        else {
            //Use custom values for local development (might want to make this a seperate config file)
            var appConfig: AppConfig = new AppConfig();
            appConfig.DevManagerServiceUrl = "http://localhost:4201/";
            appConfig.IdentityServerUrl = "https://DC0346:444/";
            appConfig.Environment = "Local Dev";
            appConfig.Version = "0.0.0.999";
            appConfig.DevManagerNodeServiceUrl = "http://localhost:3000/";
            return Observable.create((obs) => {
                obs.next(appConfig);
                obs.complete();
            });
        }
    }
}