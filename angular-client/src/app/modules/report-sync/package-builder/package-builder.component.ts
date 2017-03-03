import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ReportSyncService } from '../report-sync.service';
import { Package } from '../report-sync.models';
enum Tab {
  SSRSReports,
  DBObjects
}

@Component({
  selector: 'package-builder',
  templateUrl: './package-builder.component.html',
  styleUrls: ['./package-builder.component.css']
})
export class PackageBuilderComponent implements OnInit {

  title: string;
  package: Package;
  isLoading: boolean = true;
  tabs = Tab;
  selectedTab: Tab = Tab.DBObjects;

  constructor(
    private reportSyncService: ReportSyncService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.title = "Package Builder";
  }

  ngOnInit() {
    this.route.params.subscribe(
      (data: Params) => {
        let id: number = +data['id'];
        this.loadPackage(id);
      }
    );
  }

  loadPackage(id: number) {
    this.isLoading = true;
    this.reportSyncService.getPackage(id)
      .subscribe(
      (data: Package) => {
        this.title = "Package Builder - " + data.name;
        this.package = data;
        this.isLoading = false;
        console.log("Loaded Package", this.package);
      });
  }

  tabSelected(tab) {
    this.selectedTab = tab;
  }

  tabIsSelected(tab) {
    return this.selectedTab == tab;
  }
}

