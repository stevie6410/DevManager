import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PackageBuilderComponent } from './package-builder/package-builder.component';
import { CreatePackageComponent } from './create-package/create-package.component';
import { BrowsePackagesComponent } from './browse-packages/browse-packages.component';
import { DbObjectSearchComponent } from './db-object-search/db-object-search.component';
import { AppConfigResolve } from '../../shared/resolvers/app-config.resolver';
import { DbObjectsPanelComponent } from './package-builder/db-objects-panel/db-objects-panel.component';
import { DeploymentOverviewComponent } from './package-builder/deployment-overview/deployment-overview.component';
import { SsrsReportsPanelComponent } from './package-builder/ssrs-reports-panel/ssrs-reports-panel.component';

export const reportSyncRoutes: Routes = [
    {
        path: 'reportsync/packages', 
        component: BrowsePackagesComponent,
        resolve: { appConfig: AppConfigResolve } 
    },
    {
        path: 'reportsync/packages/build/:id', 
        component: PackageBuilderComponent,
        resolve: { appConfig: AppConfigResolve }
        // children: [
        //     { path: '', redirectTo: 'overview', pathMatch: 'full' },
        //     { path: 'overview', component: DeploymentOverviewComponent },
        //     { path: 'dbobjects', component: DbObjectsPanelComponent },
        //     { path: 'ssrs', component: SsrsReportsPanelComponent },

        // ]
    },
    {
        path: 'reportsync/packages/create', 
        component: CreatePackageComponent,
        resolve: { appConfig: AppConfigResolve }
    },
    {
        path: 'reportsync/packages/build/:id/search/dbobjects', 
        component: DbObjectSearchComponent,
        resolve: { appConfig: AppConfigResolve }
    }
];

