import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MomentModule } from 'angular2-moment';
import { AccordionModule, PopoverModule, ModalModule } from 'ng2-bootstrap';
import { PackageBuilderComponent } from './package-builder/package-builder.component';
import { ReportSyncService } from './report-sync.service';
import { CreatePackageComponent } from './create-package/create-package.component';
import { BrowsePackagesComponent } from './browse-packages/browse-packages.component';
import { DbObjectsPanelComponent } from './package-builder/db-objects-panel/db-objects-panel.component';
import { SsrsReportsPanelComponent } from './package-builder/ssrs-reports-panel/ssrs-reports-panel.component';
import { DbObjectSearchComponent } from './db-object-search/db-object-search.component';
import { ModalComponent } from './package-builder/modal/modal.component';
import { DevManagerPipesModule } from '../../shared/pipes/devman-pipes.module';
import { SharedControlsModule } from '../../shared/controls/shared-controls.module';
import { DeploymentOverviewComponent } from './package-builder/deployment-overview/deployment-overview.component';
import { DeploymentIndicatorComponent } from './package-builder/deployment-overview/deployment-indicator/deployment-indicator.component';
import { DeploymentEventsViewerComponent } from './package-builder/deployment-overview/deployment-events-viewer/deployment-events-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MomentModule,
    AccordionModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    DevManagerPipesModule,
    SharedControlsModule
  ],
  exports: [
    PackageBuilderComponent,
    CreatePackageComponent,
    BrowsePackagesComponent
  ],
  declarations: [
    PackageBuilderComponent,
    CreatePackageComponent,
    BrowsePackagesComponent,
    DbObjectsPanelComponent,
    SsrsReportsPanelComponent,
    DbObjectSearchComponent,
    ModalComponent,
    DeploymentOverviewComponent,
    DeploymentIndicatorComponent,
    DeploymentEventsViewerComponent
  ],
  providers: [
    ReportSyncService
  ]
})
export class ReportSyncModule { }
