import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';

import { SimpleCRUDService } from './simple-crud.service';
import { ColumnDef, CRUDMetadata } from './simple-crud.models';


@Component({
    templateUrl: 'simple-crud-detail.component.html',
    selector: 'app-simple-crud-detail'
})
export class SimpleCRUDDetailComponent implements OnInit, AfterViewInit {

    @ViewChild("detailForm") detailForm: NgForm;

    @Input() metadata: CRUDMetadata;

    private data: any;
    private routeId: number;
    private routeEntityName: string;
    private hasError: boolean = false;
    private hasDeleteError: boolean = false;
    private isLoading: boolean = true;
    private isSaving: boolean = false;
    private form: FormGroup;

    constructor(
        private dataService: SimpleCRUDService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.route.params.forEach((param: Params) => {
            this.routeId = +param['id'];
            this.routeEntityName = param['entity'];
        });
        this.getData();
    }

    getData() {
        console.log("GetData", this.metadata);
        this.dataService.get(this.metadata.apiName, this.routeId).subscribe(
            dept => this.data = dept,
            err => this.handleError(err),
            () => this.isLoading = false
        );
    }

    onSubmit() {
        this.isSaving = true;
        this.dataService.update(this.metadata.apiName, this.data).subscribe(null, err => { this.isSaving = false; this.hasError = true; }, () => this.isSaving = false);
    }

    delete() {
        this.dataService.delete(this.metadata.apiName, this.data.Id).subscribe(
            (data) => this.navigateBack(),
            (error) => {
                this.hasDeleteError = true;
            });
    }

    handleError(err: any) {
        this.hasError = true;
        this.isLoading = false;
    }

    navigateBack() {
        this.router.navigate(["settings/crud/" + this.metadata.apiName])
    }

    //UI Helpers
    get editButtonsDisabled(): boolean {
        return (this.isLoading || !this.data || this.isSaving || this.hasDeleteError);
    }

    get detailFormIsValid(): boolean {
        return (this.detailForm != undefined) ? this.detailForm.valid : false;
    }
};