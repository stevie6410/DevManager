import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeploymentEvent } from '../../../report-sync.models';


@Component({
  selector: 'deployment-events-viewer',
  templateUrl: './deployment-events-viewer.component.html',
  styleUrls: ['./deployment-events-viewer.component.css']
})
export class DeploymentEventsViewerComponent implements OnInit {

  @Input() events: DeploymentEvent[];
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

}
