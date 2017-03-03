/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReportSyncService } from './report-sync.service';

describe('ReportSyncService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportSyncService]
    });
  });

  it('should ...', inject([ReportSyncService], (service: ReportSyncService) => {
    expect(service).toBeTruthy();
  }));
});
