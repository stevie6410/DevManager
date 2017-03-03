import { Component, OnInit, AfterViewInit, Input, Output } from '@angular/core';
import { Package, Deployment, Environment, DeploymentEvent } from '../../report-sync.models';

@Component({
  selector: 'deployment-overview',
  templateUrl: './deployment-overview.component.html',
  styleUrls: ['./deployment-overview.component.css']
})
export class DeploymentOverviewComponent implements OnInit {

  @Input() package: Package;
  events: DeploymentEvent[];

  constructor( ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  showEvents(events: DeploymentEvent[]){
    console.log("show Events", events);
    this.events = events;
  }
  
  get devDeployment(): Deployment {
    if (this.package) {
      return this.package.deployments.filter(d => d.deployEnvironment.category == "DEV")[0];
    }
  }
  get testDeployment(): Deployment {
    if (this.package) {
      return this.package.deployments.filter(d => d.deployEnvironment.category == "TEST")[0];
    }
  }
  get prodDeployment(): Deployment {
    if (this.package) {
      return this.package.deployments.filter(d => d.deployEnvironment.category == "PROD")[0];
    }
  }

}
