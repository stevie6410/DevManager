import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'delete-panel',
    templateUrl: 'delete-panel.component.html'
})
export class DeletePanelComponent implements OnInit {

    @Input() entityName: string;
    @Input() hasDeleteError: boolean;

    @Output() deleteConfirmed = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    deleteClicked(){
        this.deleteConfirmed.emit();
    }
}