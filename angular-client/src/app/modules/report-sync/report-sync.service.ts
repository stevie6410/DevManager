import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

import { ServiceHelper } from '../../shared/service-helper';
import { AppConfig } from '../../shared/models/app-config.models';
import { DBObject, DBObjectChange, Package, DBObjectRequestDefinition, DBObjectKeyRequestDefinition, Deployment, Environment } from './report-sync.models';

@Injectable()
export class ReportSyncService {

  baseUrl: string;
  appConfig: AppConfig;

  constructor(
    private http: Http,
    private route: ActivatedRoute
  ) {
    this.appConfig = this.route.snapshot.firstChild.data['appConfig'];
    this.baseUrl = this.appConfig.DevManagerNodeServiceUrl + 'api/reportsync/';

    console.log("baseUrl", this.baseUrl);
  }

  getPackages(): Observable<Package[]> {
    let reqUrl: string = this.baseUrl + 'packages';
    return this.http.get(reqUrl)
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  getPackage(id: number): Observable<Package> {
    if (!id) {
      console.log("Invalid Id param sent to getPackage(id: number)");
      return Observable.empty();
    }
    let reqUrl: string = this.baseUrl + 'packages/' + id.toString();
    return this.http.get(reqUrl)
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  createPackage(name: string, username: string): Observable<Package> {
    let pack: Package = new Package();
    pack.name = name;
    pack.createdBy = username;

    //Set Package Defaults
    pack.status = "Open";
    pack.createdOn = new Date();

    let reqUrl: string = this.baseUrl + 'packages/';
    let body: any = JSON.stringify(pack);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(reqUrl, body, options)
      .map(
      (req: Response) => {
        return req.json();
      })
      .catch(this.handleError);

  }

  attatchDBObjectToPackage(packageId: number, database: string, schema: string, object: string): Observable<any> {
    let bodyObj: DBObjectRequestDefinition = new DBObjectRequestDefinition();
    bodyObj.databaseName = database;
    bodyObj.schemaName = schema;
    bodyObj.objectName = object;
    let body: any = JSON.stringify(bodyObj);
    let reqUrl: string = this.baseUrl + 'packages/' + packageId + '/dbobjects';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(reqUrl, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  deleteDBObjectFromPackage(id: number): Observable<DBObject> {
    let reqUrl: string = this.baseUrl + 'packagedbobjects/' + id;
    return this.http.delete(reqUrl)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  dettatchDBObjectToPackage(packageId: number, objectKey: string): Observable<DBObject> {
    let reqUrl: string = this.baseUrl + 'packages/' + packageId + '/dbobjects';

    let bodyObj: DBObjectKeyRequestDefinition = new DBObjectKeyRequestDefinition();
    bodyObj.objectKey = objectKey;
    let body: any = JSON.stringify(bodyObj);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(reqUrl, body, options).map(
      (res: Response) => res.json()
    ).catch(this.handleError);
  }

  getObjects(): Observable<DBObject[]> {
    let reqUrl: string = this.baseUrl + 'dbobjects/';
    return this.http.get(this.baseUrl)
      .map((data: Response) => {
        return data.json();
      })
      .catch(this.handleError);
  }

  getObjectsSearch(searchTerm: string, packageId: number): Observable<DBObject[]> {
    let reqUrl: string = this.baseUrl + 'dbobjects/search/' + searchTerm + '/' + packageId;
    return this.http.get(reqUrl)
      .map((data: Response) => {
        return data.json();
      })
      .catch(this.handleError);
  }

  getObject(database: string, schema: string, object: string): Observable<DBObject> {
    let reqUrl: string = this.baseUrl + 'dbobjects/' + database + '/' + schema + '/' + object;
    return this.http.get(reqUrl)
      .map((data: Response) => {
        return data.json();
      })
      .catch(this.handleError);
  }

  getObjectChanges(database: string, schema: string, object: string): Observable<DBObjectChange[]> {
    let reqUrl: string = this.baseUrl + 'dbobjects/' + database + '/' + schema + '/' + object + '/changes';
    return this.http.get(reqUrl)
      .map((data: Response) => {
        return data.json();
      })
      .catch(this.handleError);
  }

  getObjectCurrentChange(database: string, schema: string, object: string): Observable<DBObjectChange> {
    let reqUrl: string = this.baseUrl + 'dbobjects/' + database + '/' + schema + '/' + object + '/changes/current';
    return this.http.get(reqUrl)
      .map((data: Response) => {
        return data.json();
      })
      .catch(this.handleError);
  }

  addPackageDependencies(packageId: number): Observable<any> {
    let reqUrl: string = this.baseUrl + 'packages/' + packageId + '/dbdependencies';
    return this.http.post(reqUrl, null)
      .map((data: Response) => { return data.json() })
      .catch(this.handleError);
  }

  getEnvironments(): Observable<Environment[]> {
    let reqUrl: string = this.baseUrl + 'deployenvironments';
    return this.http.get(reqUrl)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  createDeployment(deployment: Deployment): Observable<Deployment> {

    let reqUrl: string = this.baseUrl + 'deployments/';
    let body: any = JSON.stringify(deployment);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(reqUrl, body, options)
      .map(
      (req: Response) => {
        return req.json();
      })
      .catch(this.handleError);
  }

  deleteDeployment(id: number): Observable<boolean>{
    let reqUrl: string = this.baseUrl + 'deployments/' + id;
    return this.http.delete(reqUrl, null)
    .map((res: Response) => res.json())
    .catch(this.handleError);
  }

  deployPackage(deployment: Deployment): Observable<Deployment> {
    let reqUrl: string = this.baseUrl + 'deployments/' + deployment.id + '/deploy';
    return this.http.post(reqUrl, null, null)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
