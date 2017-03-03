import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ng2-bootstrap';

import { EditorModule, AccordionModule, DataTableModule, SharedModule, ButtonModule } from 'primeng/primeng';

import { ReportSpecComponent } from './report-spec.component';
import { ReportSpecService } from './report-spec.service';
import { SimpleCRUDModule } from '../simple-crud/simple-crud.module';
import { ReportSpecSourcedataComponent } from './report-spec-sourcedata/report-spec-sourcedata.component';
import { ReportSpecFiltersComponent } from './report-spec-filters/report-spec-filters.component';
import { ReportSpecParametersComponent } from './report-spec-parameters/report-spec-parameters.component';
import { ReportSpecSelectionsComponent } from './report-spec-selections/report-spec-selections.component';
import { SharedControlsModule } from '../../shared/controls/shared-controls.module';

@NgModule({
  imports: [
    CommonModule,
    TabsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    AccordionModule,
    SimpleCRUDModule,
    DataTableModule,
    SharedModule,
    SharedControlsModule
  ],
  declarations: [
    ReportSpecComponent,
    ReportSpecSourcedataComponent,
    ReportSpecFiltersComponent,
    ReportSpecParametersComponent,
    ReportSpecSelectionsComponent
  ],
  providers: [
    ReportSpecService
  ]
})
export class ReportSpecModule { }
