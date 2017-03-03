import { Routes } from '@angular/router';
import { AuthGuard } from '../../shared/services/auth-guard.service';

import { DashboardComponent } from './dashboard.component';

export const dashboardRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent }
];
