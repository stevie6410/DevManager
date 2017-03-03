import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { PathLocationStrategy, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { MomentModule } from 'angular2-moment';
import { AlertModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { AuthService } from './shared/services/auth.service';
import { UserIdentity } from './shared/models/auth.models';
import { JiraAuthService } from './shared/services/jira-auth.service';
import { routing } from './app.routing';
import { AuthGuard } from './shared/services/auth-guard.service';
import { ServiceHelper } from './shared/service-helper';
import { AuditRecordService } from './shared/services/audit-record.service';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { LoginComponent } from './modules/login/login.component';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { AppConfigService } from './shared/services/app-config.service';
import { AppConfigResolve } from './shared/resolvers/app-config.resolver';
import { SharedControlsModule } from './shared/controls/shared-controls.module';
import { SettingsModule } from './modules/settings/settings.module';
import { ReportSpecModule } from './modules/report-spec/report-spec.module';
import { ReportSyncModule } from './modules/report-sync/report-sync.module';
import { PageService } from './shared/services/page.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    DashboardModule,
    SettingsModule,
    RouterModule,
    MomentModule,
    AlertModule.forRoot(),
    ReportSpecModule,
    SharedControlsModule,
    ReportSyncModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthService,
    JiraAuthService,
    AuthGuard,
    ServiceHelper,
    AuditRecordService,
    AppConfigService,
    AppConfigResolve,
    PageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
