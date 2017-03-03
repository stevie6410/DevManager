import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './modules/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { settingsRoutes } from './modules/settings/settings.routes';
import { AuthGuard } from './shared/services/auth-guard.service';
import { reportSpecRoutes } from './modules/report-spec/report-spec.routes';
import { AppConfigResolve } from './shared/resolvers/app-config.resolver';
import { reportSyncRoutes } from './modules/report-sync/report-sync.routing';

const appRoutes: Routes = [

  { path: '', component: LoginComponent, resolve: { appConfig: AppConfigResolve } },
  { path: 'login', component: LoginComponent, resolve: { appConfig: AppConfigResolve } },
  { path: 'dashboard', component: DashboardComponent, resolve: { appConfig: AppConfigResolve } },

  // Settings
    ...settingsRoutes,
  // Imported Report Spec Routes
  ...reportSpecRoutes,
  // Imported Report Sync Routes
  ...reportSyncRoutes
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);