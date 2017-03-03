import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { AppConfig } from '../../shared/models/app-config.models';
import { ServiceHelper } from '../../shared/service-helper';
import { ReportSpecHeader } from '../../shared/models/devmanager.models';
import { AuditRecordService } from '../../shared/services/audit-record.service';

@Injectable()
export class ReportSpecService {

  private appConfig: AppConfig;
  private apiMethod: string;

  constructor(
    private http: Http,
    private auditService: AuditRecordService,
    private route: ActivatedRoute
  ) {
    this.appConfig = this.route.snapshot.firstChild.data['appConfig'];
    this.apiMethod = 'api/reportspecheaders/';
  }

  getReportSepc(id: number): Observable<any> {
    var url: string = this.appConfig.DevManagerServiceUrl + this.apiMethod + id;
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateReportSpec(spec: ReportSpecHeader) {
    console.log("data for updating", spec);
    var url: string = this.appConfig.DevManagerServiceUrl + this.apiMethod + '/' + spec.Id;
    var body: string = JSON.stringify(spec);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var response: Observable<Response> = this.http.put(url, body, options).catch(this.handleError);
    return response;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
