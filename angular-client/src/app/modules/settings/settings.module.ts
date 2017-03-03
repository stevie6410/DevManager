import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { SettingsComponent } from './settings.component';
import { SettingsListComponent } from './settings-list.component';
import { SettingsDetailComponent } from './settings-detail.component';
import { SettingsCRUDMetaDataService } from './settings-crud-metadata.service';
import { settingsRouting } from './settings.routes';
import { SimpleCRUDModule } from '../simple-crud/simple-crud.module';
import { SharedControlsModule } from '../../shared/controls/shared-controls.module';

@NgModule({
    imports: [
        settingsRouting,
        RouterModule,
        SimpleCRUDModule,
        BrowserModule,
        SharedControlsModule
    ],
    exports: [
    ],
    declarations: [
        SettingsComponent,
        SettingsListComponent,
        SettingsDetailComponent
    ],
    providers: [
        SettingsCRUDMetaDataService
    ],
})
export class SettingsModule { }
