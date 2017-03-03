import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { LoginCredential } from './shared/models/auth.models';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PageService } from './shared/services/page.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ["css/bootstrapv4.css", "./app.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  fields: any[];
  pageTitle: string;

  constructor(
    private authService: AuthService,
    private pageService: PageService
  ) {
    this.pageService.title$.subscribe(
      (title: string) => {
        console.log(title);
        this.pageTitle = title;
      }
    );
  }

  sidebarIsVisible: boolean = true;

  ngOnInit() {
    this.pageService.setPageTitle("Application Root!");
  }

  navBack() {
    window.history.back();
  }

  setSidebarVisibility(isVisible: boolean) {
    this.sidebarIsVisible = isVisible;
  }

}