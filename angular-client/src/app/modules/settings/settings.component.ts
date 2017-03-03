import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-settings',
    templateUrl: 'settings.component.html'
})
export class SettingsComponent implements OnInit {
    title: string = "Settings";
    constructor() { }

    ngOnInit() {

    }
}