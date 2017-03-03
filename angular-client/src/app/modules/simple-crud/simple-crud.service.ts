import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { ServiceHelper } from '../../shared/service-helper';
import { AuditRecordService } from '../../shared/services/audit-record.service';
import { AppConfigService } from '../../shared/services/app-config.service';
import { AppConfig } from '../../shared/models/app-config.models';

@Injectable()
export class SimpleCRUDService {

    private apiUrl: string;
    private responseOptions = null;
    private appConfig: AppConfig;

    constructor(
          private _http: Http
        , private _serviceHelper: ServiceHelper
        , private auditRecordService: AuditRecordService
        , private route: ActivatedRoute) {
        this.appConfig = this.route.snapshot.firstChild.data['appConfig'];
        this.apiUrl = this.appConfig.DevManagerNodeServiceUrl + 'api/';
    }

    getAll(entityName: string): Observable<any[]> {
        return this._http.get(this.apiUrl + this.formatEntityName(entityName), this.responseOptions)
            .map((r: Response) => r.json())
            .catch(this.handleError);
    }

    get(entityName: string, id: number): Observable<any> {
        return this._http.get(this.apiUrl + this.formatEntityName(entityName) + '/' + id, this.responseOptions)
            .map((r: Response) => <any>r.json())
            .catch(this.handleError);
    }

    update(entityName: string, data: any): Observable<Response> {
        var auditedData: any = this.auditRecordService.setAuditFields(data, false, true);
        var body: string = JSON.stringify(auditedData);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var response: Observable<Response> = this._http.put(this.apiUrl + this.formatEntityName(entityName) + '/' + data.Id, body, options)
            .catch(this.handleError);
        return response;
    }

    create(entityName: string, data: any): Observable<Response> {
        var auditedData: any = this.auditRecordService.setAuditFields(data, true, true);
        var body: string = JSON.stringify(auditedData);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.apiUrl + this.formatEntityName(entityName), body, options)
            .map((r: Response) => r.json())
            .catch(this.handleError);
    }

    delete(entityName: string, id: number) {
        return this._http.delete(this.apiUrl + this.formatEntityName(entityName) + '/' + id).catch(this.handleError);
    }

    formatEntityName(entityName: string): string {
        //Lowercase and pluralise
        // console.log("formatEntityName: ", entityName);
        return entityName.toLowerCase();
    }

    handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        console.log(error);
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}