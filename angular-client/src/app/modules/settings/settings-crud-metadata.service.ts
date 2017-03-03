import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { CRUDMetadata, ColumnDef } from '../simple-crud/simple-crud.models';


@Injectable()
export class SettingsCRUDMetaDataService {

    getCRUDMetadata(entityName: string): Observable<CRUDMetadata> {
        return Observable.create((obs) => {
            var result = this.metadataStore.filter(rec => rec.apiName == entityName)[0];
            obs.next(result);
            obs.complete();
        });
    }

    getAll(): Observable<CRUDMetadata[]> {
        return Observable.create((obs) => {
            var result = this.metadataStore;
            obs.next(result);
            obs.complete;
        });
    }

    private metadataStore: CRUDMetadata[] = [
        {
            entityName: 'Department',
            entityNamePlural: 'Departments',
            apiName: 'departments',
            listCols: [
                { name: 'name', label: 'Name', required: true, routerLink: '/settings/crud/departments', routerParam: 'id' },
                { name: 'owner', label: 'Owner', required: true },
                { name: 'created_on', label: 'Created On', required: false, date: true },
                { name: 'modified_on', label: 'Modified On', required: false, date: true }
            ],
            detailCols: [
                { name: 'name', label: 'Name', required: true },
                { name: 'owner', label: 'Owner', required: true },
                { name: 'createdBy', label: 'Created By', required: true }
            ]
        },
        {
            entityName: 'Developer',
            entityNamePlural: 'Developers',
            apiName: 'developers',
            listCols: [
                { name: 'FullName', label: 'Full Name', required: true, routerLink: '/settings/crud/developers', routerParam: 'id' },
                { name: 'LoweredUserName', label: 'Username', required: true },
                { name: 'EmailAddress', label: 'Email', required: true },
                { name: 'Created', label: 'Created On', required: false, date: true },
                { name: 'Modified', label: 'Modified On', required: false, date: true }
            ],
            detailCols: [
                { name: 'FullName', label: 'Full Name', required: true },
                { name: 'LoweredUserName', label: 'Username', required: true },
                { name: 'EmailAddress', label: 'Email', required: true }
            ]
        },
        {
            entityName: 'Software Package',
            entityNamePlural: 'Software Packages',
            apiName: 'softwarepackages',
            listCols: [
                { name: 'Name', label: 'Name', required: true, routerLink: '/settings/crud/softwarepackages', routerParam: 'id' },
                { name: 'Description', label: 'Description', required: true },
                { name: 'Created', label: 'Created On', required: false, date: true },
                { name: 'Modified', label: 'Modified On', required: false, date: true }
            ],
            detailCols: [
                { name: 'Name', label: 'Name', required: true, routerLink: '/settings/crud/departments' },
                { name: 'Description ', label: 'Description', required: true }
            ]
        },
        {
            entityName: 'Issue Type',
            entityNamePlural: 'Issue Types',
            apiName: 'issuetypes',
            listCols: [
                { name: 'Name', label: 'Name', required: true, routerLink: '/settings/crud/issuetypes', routerParam: 'id' }
            ],
            detailCols: [
                { name: 'Name', label: 'Name', required: true, routerLink: '/settings/crud/issuetypes' }
            ]
        },
        {
            entityName: 'Development Type',
            entityNamePlural: 'Development Types',
            apiName: 'developmenttypes',
            listCols: [
                { name: 'Name', label: 'Name', required: true, routerLink: '/settings/crud/developmenttypes', routerParam: 'id' }
            ],
            detailCols: [
                { name: 'Name', label: 'Name', required: true, routerLink: '/settings/crud/developmenttypes' }
            ]
        },
        {
            entityName: 'Doc Type',
            entityNamePlural: 'Doc Types',
            apiName: 'doctypes',
            listCols: [
                { name: 'Name', label: 'Name', required: true, routerLink: '/settings/crud/doctypes', routerParam: 'id' },
                { name: 'Created', label: 'Created On', required: false, date: true },
                { name: 'Modified', label: 'Modified On', required: false, date: true }
            ],
            detailCols: [
                { name: 'Name', label: 'Name', required: true, routerLink: '/settings/crud/doctypes' }
            ]
        },
        {
            entityName: 'Status',
            entityNamePlural: 'Status Set',
            apiName: 'status',
            listCols: [
                { name: 'Name', label: 'Name', required: true, routerLink: '/settings/crud/status', routerParam: 'id' },
                { name: 'Description', label: 'Description', required: true },
                { name: 'IsActiveStatus', label: 'Is Active', required: true },
                { name: 'Created', label: 'Created On', required: false, date: true },
                { name: 'Modified', label: 'Modified On', required: false, date: true }
            ],
            detailCols: [
                { name: 'Name', label: 'Name', required: true, routerLink: '/settings/crud/status' }
            ]
        },
        {
            entityName: 'Development Request Default',
            entityNamePlural: 'Development Request Defaults',
            apiName: 'developmentrequestdefaults',
            listCols: [
                { name: 'Name', label: 'Name', required: true, routerLink: '/settings/crud/developmentrequestdefaults', routerParam: 'id' },
                { name: 'EstHours', label: 'Estimated Hours', required: true },
                { name: 'CompletedHours', label: 'Completed Hours', required: true },
                { name: 'Created', label: 'Created On', required: false, date: true },
                { name: 'Modified', label: 'Modified On', required: false, date: true }
            ],
            detailCols: [
                { name: 'Name', label: 'Name', required: true, routerLink: '/settings/crud/developmentrequestdefaults' },
                { name: 'Notes', label: 'Notes', required: false, date: true }
            ]
        }

    ];


}
