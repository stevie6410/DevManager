import { Component, OnInit, AfterViewInit, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditorModule, DataTableModule, SharedModule, ButtonModule } from 'primeng/primeng';

import { CrudTableConfig } from '../../../shared/controls/crud-table/crud-table.config';

@Component({
  selector: 'crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.css']
})
export class CrudTableComponent implements OnInit, AfterViewInit {

  @Input() data: any;
  @Input() config: CrudTableConfig[];

  selection: any[] = [];
  selected: any;

  constructor() { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {

  }

  editRow(row: any) {
    this.selected = row;
  }

  saveRow(row: any){
    this.selected = null;
  }

  isRowSelected(row: any): boolean {
    return (this.selected) ? (this.selected.Id == row.Id) : false;
  }
}
