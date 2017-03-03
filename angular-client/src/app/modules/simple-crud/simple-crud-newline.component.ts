import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimpleCRUDService } from './simple-crud.service';
import { ColumnDef, CRUDMetadata } from './simple-crud.models';

@Component({
    selector: 'simple-crud-new-line',
    templateUrl: 'simple-crud-newline.component.html'
})
export class SimpleCRUDNewLineComponent {

    private data: any;
    private hasError: boolean = false;
    private isSaving: boolean = false;
    private colDefs: ColumnDef[];
    
    //Inputs
    @Input() metadata: CRUDMetadata;

    //Output Events
    @Output() onSaved = new EventEmitter();

    constructor(
        private _deptService: SimpleCRUDService
        ) { }

    ngOnInit() {
        this.reset();
        this.colDefs = this.metadata.detailCols.filter(col => col.required);
    }

    saveNewLine(data: any) {
        console.log(data);
        this.isSaving = true;
        this._deptService.create(this.metadata.apiName, data).subscribe(
            data => {
                this.onSaved.emit();
            },
            err => {
                this.isSaving = false;
                this.hasError = true;
            },
            () => {
                this.isSaving = false;
                this.reset();
            }
        );
    }

    reset() {
        this.hasError = false;
        this.isSaving = false;
        this.data = new Object();
    }

    handleError(err: any) {
        this.hasError = true;
        this.isSaving = false;
    }
}