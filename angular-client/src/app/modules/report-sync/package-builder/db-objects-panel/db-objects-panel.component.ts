import { Component, OnInit, AfterViewInit, Input, ViewChild, ViewChildren, QueryList, EventEmitter, Output, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ModalComponent } from '../modal/modal.component';
import { DBObject, Package } from '../../report-sync.models';
import { ReportSyncService } from '../../report-sync.service';

@Component({
  selector: 'db-objects-panel',
  templateUrl: './db-objects-panel.component.html',
  styleUrls: ['./db-objects-panel.component.css']
})
export class DbObjectsPanelComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChildren(ModalComponent) modals: QueryList<ModalComponent>;
  
  @Input() package: Package;
  @Output() onReload: EventEmitter<boolean> = new EventEmitter<Boolean>();

  selectedObj: DBObject;

  viewSQLModal: ModalComponent;
  addDbObjectModal: ModalComponent;

  isLoading: boolean;
  isLoadingDependencies: boolean = false;

  constructor(
    private reportSyncService: ReportSyncService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
   
  }

  ngAfterViewInit() {
    this.viewSQLModal = this.modals.filter(m => m.name == "viewSQLModal")[0];
    this.addDbObjectModal = this.modals.filter(m => m.name == "addDbObjectModal")[0];
  }

  showSQLModal(obj: DBObject){
    this.selectedObj = obj;
    this.viewSQLModal.show();
  }

  showModal(modalName: string) {
    let modal: ModalComponent = this.modals.filter(m => m.name == modalName)[0];
    if (modal != null) {
      modal.show();
    } else {
      console.log(this.modals);
    }
  }

  hideModal(modalName: string) {
    this.modals.filter(m => m.name == modalName)[0].hide();
  }

  deleteDbObj(obj: DBObject) {
    this.package.packageDbObjects = this.package.packageDbObjects.filter(x => x.id != obj.id);
    this.reportSyncService.deleteDBObjectFromPackage(obj.id).subscribe(
      (data: DBObject) => {
        console.log("Deleted", data);
      });
  }

  scanForDependencies() {
    this.isLoadingDependencies = true;
    this.reportSyncService.addPackageDependencies(this.package.id)
      .subscribe(
      data => {
        this.isLoadingDependencies = false;
        this.onReload.emit(true);
      });
  }

  ngOnDestroy() {
  }
}
