import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AppConfigService } from '../services/app-config.service';
import { AppConfig } from '../models/app-config.models';

@Injectable()
export class AppConfigResolve implements Resolve<AppConfig>{

    constructor(private appConfigService: AppConfigService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.appConfigService.getAppData();
    }
}