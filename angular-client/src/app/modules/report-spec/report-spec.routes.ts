import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportSpecComponent } from './report-spec.component';
import { AppConfigResolve } from '../../shared/resolvers/app-config.resolver';

export const reportSpecRoutes: Routes = [
    {
        path: 'reportspec/:id', resolve: { appConfig: AppConfigResolve }, component: ReportSpecComponent
    }
];

