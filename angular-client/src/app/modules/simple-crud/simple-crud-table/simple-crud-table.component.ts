import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import 'moment/min/locales';
// under systemjs, moment is actually exported as the default export, so we account for that
const momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;
@Component({
  selector: 'app-simple-crud-table',
  templateUrl: './simple-crud-table.component.html',
  styleUrls: ['./simple-crud-table.component.css']
})
export class SimpleCrudTableComponent implements OnInit {

  @Input() metadata: any;
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

  getCellValue(row: any, col: any): string {
    var value: string = row[col.name];
    if (!value) return null;
    if (col.date) {
      var moment = momentConstructor(value).locale("en-gb");
      return moment.calendar();
    }
    console.log(value);
    return value;
  }

}
