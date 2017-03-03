import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, Input, NgZone, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as moment from 'moment';
import 'moment/min/locales';

import { SimpleCRUDService } from './simple-crud.service';
import { ColumnDef, CRUDMetadata } from './simple-crud.models';

// under systemjs, moment is actually exported as the default export, so we account for that
const momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;

@Component({
    selector: 'app-simple-crud-list',
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl: 'simple-crud-list.component.html',
    styleUrls: ["simple-crud-list.component.css"]
})
export class SimpleCRUDListComponent implements OnInit, AfterViewInit {

    @Input() metadataStore: CRUDMetadata[];

    private metadata: CRUDMetadata;
    private routeEntity: string;
    private entityLabel: string;
    private entityLabels: string;
    private cols: ColumnDef[];
    private data: any[] = [];
    private newLine: any[] = [];
    private hasError: boolean = false;
    private isLoading: boolean = true;
    private searchTerm: string = "";
    private showNewLine: boolean = false;
    private moment: any = momentConstructor();

    get hasNewLine(): boolean { return this.newLine.length > 0; }
    get recCount(): number { return (this.data) ? this.data.length : 0; };
    get diagnostic(): string { return (this.data) ? JSON.stringify(this.data[0]) : "null"; }

    constructor(
        private dataService: SimpleCRUDService,
        private router: Router,
        private route: ActivatedRoute) {
        this.router.events.subscribe((event: Event) => {
            console.log("routerevent");

            if (event.url.startsWith("/settings") && event instanceof NavigationStart) {
                this.data = null;
            }

            if (event.url.startsWith("/settings") && event instanceof NavigationEnd) {
                this.rebuildState();
            }
        });

    }

    rebuildState() {
        this.route.params.forEach((param: Params) => {
            this.routeEntity = param['entity'];
        });
        this.metadata = this.metadataStore.filter(meta => meta.apiName == this.routeEntity)[0];
        console.log("Got Metadata in crud-list", this.metadata);
        this.getData();
    }

    ngOnInit() {


    }

    ngAfterViewInit() {
        // this.rebuildState();
    }

    getCellValue(row: any, col: ColumnDef): string {
        var value: string = row[col.name];
        if (!value) return null;
        if (col.date) {
            var moment = momentConstructor(value).locale("en-gb");
            return moment.calendar();
        }
        console.log(value);
        return value;
    }

    getData() {
        this.isLoading = true;
        this.hasError = false;
        this.dataService.getAll(this.metadata.apiName).subscribe(
            data => {
                this.data = data;
                console.log(this.data);
            },
            err => {
                this.handleError(err);
            },
            () => {
                this.isLoading = false;
                this.showNewLine = false;
            });
    }

    handleError(err: any) {
        this.hasError = true;
        this.isLoading = false;
    }
}