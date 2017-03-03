import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DBObject, Package } from '../report-sync.models';
import { ReportSyncService } from '../report-sync.service';

@Component({
  selector: 'db-object-search',
  templateUrl: './db-object-search.component.html',
  styleUrls: ['./db-object-search.component.css']
})
export class DbObjectSearchComponent implements OnInit {

  @Input() package: Package;
  searchTerm: string = "";
  searchResults: DBObject[] = [];
  isLoading: boolean = true;
  isSearching: boolean = false;
  selected: DBObject;
  title: string = "Search Database Objects";

  constructor(
    private reportSyncService: ReportSyncService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.reportSyncService.getPackage(+params['id']))
      .subscribe(
      (data: Package) => {
        this.package = data;
        this.isLoading = false;
      });
  }

  onSelection(selection: any) {
    this.selected = selection;
  }

  search() {
    this.isSearching = true;
    this.reportSyncService.getObjectsSearch(this.searchTerm, this.package.id).subscribe(
      (data: DBObject[]) => {
        this.searchResults = data;
        // console.log("Search Results", this.searchResults);
        this.isSearching = false;
      }
    );
  }

  addToPackage(dbObject: DBObject) {
    if (this.package != null) {
      dbObject.isInPackage = true;
      this.reportSyncService.attatchDBObjectToPackage(this.package.id, dbObject.databaseName, dbObject.schemaName, dbObject.objectName)
        .subscribe(
        (data: DBObject) => {
          this.package.packageDbObjects.push(data);
        });
    } else {
      console.log("No package to attach DB Object to");
    }
  }
}
