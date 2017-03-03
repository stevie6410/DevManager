import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { ReportSpecService } from './report-spec.service';
import { ReportSpecHeader } from '../../shared/models/devmanager.models';
import { CrudTableConfig } from '../../shared/controls/crud-table/crud-table.config';

@Component({
  templateUrl: './report-spec.component.html',
  styleUrls: ['./report-spec.component.css']
})
export class ReportSpecComponent implements OnInit, OnChanges {

  private isLoading: boolean = false;
  private isSaving: boolean = false;
  private hasError: boolean = false;
  private data: ReportSpecHeader;
  private form: FormGroup;
  private sourceDataTableConfig: CrudTableConfig;

  constructor(
    private dataService: ReportSpecService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    //Configure the dynamic form builder
    this.form = this.fb.group({
      ReportName: ['', Validators.required],
      PreparedBy: ['', Validators.required],
      BusinessArea: ['', Validators.required],
      BusinessOwner: ['', Validators.required],
      ReportType: ['', Validators.required],
      SoftwarePackage: [''],
      BusinessPurpose: ['', Validators.required],
      StdVsAdHocDesc: ['', Validators.required],
      ReportSpecSourceDatas: this.fb.array([])
    });
  }

  initReportSpecSourceDatas(): FormGroup {
    return this.fb.group({
      Id: [''],
      ElementName: [''],
      SourceSystem: [''],
      TableName: ['']
    });
  }

  addReportSpecSourceData(dta) {
    const control = <FormArray>this.form.controls['ReportSpecSourceDatas'];
    var newControl = this.initReportSpecSourceDatas();
    newControl.patchValue(dta);
    control.push(newControl);
  }

  ngOnInit() {
    this.isLoading = true;
    //Get the id from the route and get the data
    this.route.params
      .switchMap((params: Params) => this.dataService.getReportSepc(params['id']))
      .subscribe(
      (data) => {
        console.log(data);
        this.isLoading = false;
        this.data = data;
        this.form.patchValue(data);
        data.ReportSpecSourceDatas.forEach(dta => this.addReportSpecSourceData(dta));
      }
      );

    this.configureTables();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'].currentValue) {
      console.log("Picked up changes", changes['data']);
      this.form.patchValue(changes['data'].currentValue);
    }
  }

  configureTables() {
    this.sourceDataTableConfig = {
      selectionMode: "multiple",
      editable: true,
      cols: [
        { name: 'TableName', label: 'Table Name', editable: true },
        { name: 'SourceSystem', label: 'Source System', editable: true },
        { name: 'ElementName', label: 'Element Name', editable: false }
      ]
    };
  }

  onSubmit() {
    this.isSaving = true;
    this.dataService.updateReportSpec(this.form.value).subscribe(
      data => { console.log("Succesfull", data); this.isSaving = false; },
      err => { console.log("Failed", err); this.isSaving = false; },
      () => { }
    );
  }

  exportPDF() {
    var url = "http://DCWSAORD001P/ReportServer?/_Report Server Admin/Report Specification HTML&rs:Format=PDF&rs:ClearSession=true&ReportSpecID=" + this.data.Id;
    this.openInNewTab(url);
  }

  minimiseGroups() {

  }

  handleData(data: any) {
    console.log("handledata", data);
    this.data = data;
    this.isLoading = false;
    this.hasError = false;
  }

  handleError(err: any) {
    console.error(err);
    this.hasError = true;
    this.isLoading = false;
  }

  openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }
}
