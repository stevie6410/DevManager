import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Event, NavigationEnd } from '@angular/router';

import { SettingsCRUDMetaDataService } from './settings-crud-metadata.service';
import { CRUDMetadata } from '../simple-crud/simple-crud.models';

@Component({
    template: ` 
               <div *ngIf="metadataStore"><app-simple-crud-list [metadataStore]="metadataStore"></app-simple-crud-list></div>
                `
})
export class SettingsListComponent implements OnInit {

    private entityName: string;
    private metadataStore: CRUDMetadata[];


    constructor(
        private route: ActivatedRoute,
        private metadataService: SettingsCRUDMetaDataService,
        private router: Router
    ) { }

    ngOnInit() {
        this.init();
    }

    init() {
        //Get the entity name from the route params
        this.route.params.forEach((param: Params) => {
            let entity: string = param['entity'];
            this.entityName = entity;
            this.getCRUDConfig();
        });
    }

    getCRUDConfig() {
        this.metadataService.getAll().subscribe(
            (meta) => this.metadataStore = meta,
            (err) => console.log("Error retrrivig metadata", err),
            () => null
        );
    }
}