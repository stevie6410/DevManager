import { Component, OnInit } from '@angular/core';

import { Package } from '../report-sync.models';
import { ReportSyncService } from '../report-sync.service';
import { PageService } from '../../../shared/services/page.service';

@Component({
  selector: 'app-browse-packages',
  templateUrl: './browse-packages.component.html',
  styleUrls: ['./browse-packages.component.css']
})
export class BrowsePackagesComponent implements OnInit {

  title: string = "Search Pakcages";
  packages: Package[] = [];
  isLoading: boolean = true;

  constructor(
    private reportSyncService: ReportSyncService,
    private pageService: PageService
  ) {
    this.pageService.setPageTitle("Search Deploy Packages");
  }

  ngOnInit() {
    this.updatePackages();
  }

  updatePackages() {
    this.reportSyncService.getPackages().subscribe(
      (data: Package[]) => {
        this.packages = data;
        this.isLoading = false;
      },
      (err) => console.log(err)
    );
  }

}
