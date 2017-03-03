import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

import { AuthService } from './auth.service';

@Injectable()
export class AuditRecordService {

    constructor(private authService: AuthService) { }

    private userInfo

    setAuditFields(entity: any, setCreated: boolean, setModified: boolean): any {
        var user: any = this.authService.user;
        var username: string = (user) ? user.given_name + ' ' + user.family_name : "unknown";
        if (setCreated) {
            entity.CreatedBy = username;
            entity.Created = new Date();
        }
        if (setModified) {
            entity.ModifiedBy = username;
            entity.Modified = new Date();
        }
        return entity;
    }
}