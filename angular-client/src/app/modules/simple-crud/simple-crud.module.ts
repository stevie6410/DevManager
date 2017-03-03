import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment'; 

import { DevManagerPipesModule } from '../../shared/pipes/devman-pipes.module';
import { SharedFormsModule } from '../shared-forms/shared-forms.module';
import { SimpleCRUDComponent } from './simple-crud.component';
import { SimpleCRUDListComponent } from './simple-crud-list.component';
import { SimpleCRUDService } from './simple-crud.service';
import { SimpleCRUDNewLineComponent } from './simple-crud-newline.component';
import { SimpleCRUDDetailComponent } from './simple-crud-detail.component';
import { SimpleCrudTableComponent } from './simple-crud-table/simple-crud-table.component';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        FormsModule,
        SharedFormsModule,
        DevManagerPipesModule,
        MomentModule
    ],
    exports: [
        SimpleCRUDComponent,
        SimpleCRUDListComponent,
        SimpleCRUDDetailComponent
    ],
    declarations: [
        SimpleCRUDComponent,
        SimpleCRUDListComponent,
        SimpleCRUDNewLineComponent,
        SimpleCRUDDetailComponent,
        SimpleCrudTableComponent
    ],
    providers: [
        SimpleCRUDService
    ]
})
export class SimpleCRUDModule { }
