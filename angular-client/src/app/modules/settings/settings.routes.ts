import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SettingsComponent } from './settings.component';
import { SettingsListComponent } from './settings-list.component';
import { SettingsDetailComponent } from './settings-detail.component';
import { AuthGuard } from '../../shared/services/auth-guard.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { dashboardRoutes } from '../dashboard/dashboard.routes';
import { AppConfigResolve } from '../../shared/resolvers/app-config.resolver';

export const settingsRoutes: Routes = [
    {
        path: "settings",
        component: SettingsComponent,
        canActivate: [AuthGuard],
        resolve: { appConfig: AppConfigResolve },
        children: [
            //Settings Root Path
            { path: '', redirectTo: 'crud/departments', pathMatch: "full" },
            { path: 'crud/:entity', component: SettingsListComponent },
            { path: 'crud/:entity/:id', component: SettingsDetailComponent }

        ]
    }
];

export const settingsRouting: ModuleWithProviders = RouterModule.forChild(settingsRoutes);