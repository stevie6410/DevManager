import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'change-detail-form',
    templateUrl: 'changedetail-form.component.html'
})

export class ChangeDetailFormComponent implements OnInit {

    @Input() model: any;

    constructor() { }

    ngOnInit() { }

    get hasAuditFields(): boolean{
        return (this.model.CreatedBy || this.model.Created || this.model.ModifiedBy || this.model.Modified);
    }
}