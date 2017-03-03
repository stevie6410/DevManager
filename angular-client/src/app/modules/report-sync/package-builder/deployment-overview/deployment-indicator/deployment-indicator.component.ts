import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Deployment, Environment, Package, DeploymentEvent } from '../../../report-sync.models';
import { ReportSyncService } from '../../../report-sync.service';

@Component({
  selector: 'deployment-indicator',
  templateUrl: './deployment-indicator.component.html',
  styleUrls: ['./deployment-indicator.component.css']
})
export class DeploymentIndicatorComponent implements OnInit {

  @Input() package: Package;
  @Input() deployment: Deployment;
  @Input() environment: string = "";
  @Output() onDeploy: EventEmitter<any> = new EventEmitter<any>();
  @Output() onShowEvents: EventEmitter<DeploymentEvent[]> = new EventEmitter<DeploymentEvent[]>();

  constructor(
    private reportSyncService: ReportSyncService
  ) { }

  ngOnInit() {
  }

  get envCategory(): string {
    switch (this.environment) {
      case "Development":
        return "DEV";
      case "Test":
        return "TEST";
      case "Production":
        return "PROD";
      default:
        return this.environment;
    }
  }

  private createDeploymentObject(env: Environment): Deployment {
    //Create the new deployment object
    let deployment: Deployment = new Deployment();
    deployment.package_id = this.package.id;
    deployment.deploy_environment_id = env.id;
    deployment.createdOn = new Date();
    deployment.createdBy = "Steve Kent";
    deployment.status = "Pending";
    return deployment;
  }

  deploy() {
    console.log("Deploy to " + this.environment);
    //Get environment based on the given string
    this.reportSyncService.getEnvironments().subscribe(
      (data: Environment[]) => {
        let env = data.filter(e => e.category == this.envCategory)[0];
        if (env) {
          this.reportSyncService.createDeployment(this.createDeploymentObject(env)).subscribe(
            (dep: Deployment) => {
              //Set the deployment to the newly configured deployment record
              this.deployment = dep;

              //Now start deploying
              this.reportSyncService.deployPackage(this.deployment).subscribe(
                (dep: Deployment) => {
                  console.log("Finally finished deployment", dep);
                  this.deployment = dep;
                }
              );
            }
          );
        } else {
          console.log("No matching enviornment could be found!");
        }
      }
    );
  }

  deleteDeployment(){
    this.reportSyncService.deleteDeployment(this.deployment.id).subscribe(
      (res) => {
        this.deployment = null;
      }
    );
  }
}
