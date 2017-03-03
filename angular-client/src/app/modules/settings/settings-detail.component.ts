import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SettingsCRUDMetaDataService } from '../settings/settings-crud-metadata.service';
import { ColumnDef, CRUDMetadata } from '../simple-crud/simple-crud.models';

@Component({
    template: `
    <app-simple-crud-detail *ngIf="metadata" [metadata]="metadata"></app-simple-crud-detail>
    `
})
export class SettingsDetailComponent implements OnInit {

    private metadata: CRUDMetadata;
    private routeEntityName: string;
    private id: number;

    constructor(
        private route: ActivatedRoute,
        private metadataService: SettingsCRUDMetaDataService
    ) { }

    ngOnInit() {
        //Get the entity name from the route params
        this.route.params.forEach((param: Params) => {
            this.routeEntityName = param['entity'];
            this.id = +param['id'];
            this.getCRUDConfig();
        });
    }

    getCRUDConfig() {
        this.metadataService.getAll().subscribe(
            (meta) => {
                this.metadata = meta.filter(meta => meta.apiName == this.routeEntityName)[0];
            },
            (err) => console.log("Error retrrivig metadata", err),
            () => null
        );
    }
}