import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditorModule, DataTableModule, SharedModule, ButtonModule, InplaceModule } from 'primeng/primeng';

import { SimpleEditorComponent } from './simple-editor/simple-editor.component';
import { CrudTableComponent } from './crud-table/crud-table.component';
import { FormTextComponent } from './form-text/form-text.component';
import { PageComponent } from './page/page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    EditorModule,
    DataTableModule,
    SharedModule,
    ButtonModule,
    InplaceModule
  ],
  declarations: [
    SimpleEditorComponent,
    CrudTableComponent,
    FormTextComponent,
    PageComponent
  ],
  exports: [
    SimpleEditorComponent,
    CrudTableComponent,
    FormTextComponent,
    PageComponent
  ]
})
export class SharedControlsModule { }
