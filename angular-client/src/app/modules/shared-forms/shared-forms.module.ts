import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MomentModule } from 'angular2-moment'; 

import { ChangeDetailFormComponent } from './changedetail-form.component';
import { DeletePanelComponent } from './delete-panel.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        MomentModule
    ],
    exports: [
        ChangeDetailFormComponent,
        DeletePanelComponent
    ],
    declarations: [
        ChangeDetailFormComponent,
        DeletePanelComponent
    ],
    providers: [],
})
export class SharedFormsModule { }
