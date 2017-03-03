import { Component, OnInit, Input } from '@angular/core';

import { ReportSpecSourceData } from '../../../shared/models/devmanager.models';

@Component({
  selector: 'app-report-spec-sourcedata',
  templateUrl: './report-spec-sourcedata.component.html',
  styleUrls: ['./report-spec-sourcedata.component.css']
})
export class ReportSpecSourcedataComponent implements OnInit {

  @Input() data: ReportSpecSourceData[];

  selection: ReportSpecSourceData[] = [];

  constructor() { }

  ngOnInit() {
  }

  addNew() {
    var newLine = new ReportSpecSourceData();
    newLine.RowPosition = this.data.length + 1;
    this.data.push(newLine);
  }

  deleteSelected() {
    //Loop through each element in the selection array
    this.selection.forEach(element => {
      //Get the position of the element so that we can delete it
      var indexPos: number;
      if (element.Id > 0)
      { indexPos = this.data.findIndex(x => x.Id == element.Id); }
      else
      { indexPos = this.data.findIndex(x => x.RowPosition == element.RowPosition); }
      //Remove the element from the array
      this.data.splice(indexPos, 1);
    });
    this.selection = [];
  }
}
