import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ReportSyncService } from '../report-sync.service';
import { Package } from '../report-sync.models';
import { PageService } from '../../../shared/services/page.service';

@Component({
  selector: 'create-package',
  templateUrl: './create-package.component.html',
  styleUrls: ['./create-package.component.css']
})
export class CreatePackageComponent implements OnInit {

  title: string = "Create Package";
  packageName: string;
  username: string;
  validationMessage: string;
  package: Package;
  isSaving: boolean = false;
  constructor(
    private reportSyncService: ReportSyncService,
    private router: Router,
    private pageService: PageService
  ) {
    this.pageService.setPageTitle("Create Package");
  }

  ngOnInit() {
  }

  onSubmit() {
    this.isSaving = true;
    if (this.packageName && this.packageName != "") {
      let user: string = this.username == null ? "unknown" : this.username;
      this.reportSyncService.createPackage(this.packageName, user)
        .subscribe(
        (data: Package) => {
          this.package = data;
          this.router.navigate(['/reportsync/packages/build', this.package.id]);
        },
        (err: any) => {
          console.log(err);
        }
        );
    } else {
      this.validationMessage = "Invalid Package Name!";
    }
  }
}
