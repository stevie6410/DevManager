import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class PageService {

    private _title = new Subject<string>();
    title$ = this._title.asObservable();

    setPageTitle(title: string){
        console.log(title);
        this._title.next(title);
    }

}
