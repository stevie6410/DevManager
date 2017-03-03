import { Injectable } from '@angular/core';
import { ReportSyncService } from '../report-sync.service';
import { Package } from '../report-sync.models';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class ServiceNameService {

    //Observable package source
    private packageSource = new Subject<Package>();

    //Observable package stream
    package$ = this.packageSource.asObservable();

    //Commands
    refreshData(){
        
    }

    constructor(
        private reportSyncService: ReportSyncService
    ) { }

    getPackage(id: number){
        this.package$ = this.reportSyncService.getPackage(id);
    }
}