import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ssrs-reports-panel',
  templateUrl: './ssrs-reports-panel.component.html',
  styleUrls: ['./ssrs-reports-panel.component.css']
})
export class SsrsReportsPanelComponent implements OnInit {

  @Input() package;

  constructor() { }

  ngOnInit() {
  }

}
