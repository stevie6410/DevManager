import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    @Input() sidebarIsVisible: boolean = true;

    constructor() { }

    ngOnInit() {

        
    }

    setVisibility(isVisible: any){
        this.sidebarIsVisible = isVisible;
    }
}