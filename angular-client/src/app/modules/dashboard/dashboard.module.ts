import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { SharedControlsModule } from '../../shared/controls/shared-controls.module';

@NgModule({
    imports: [
        SharedControlsModule
    ],
    exports: [
        DashboardComponent
    ],
    declarations: [
        DashboardComponent
    ],
    providers: [],
})
export class DashboardModule { }

