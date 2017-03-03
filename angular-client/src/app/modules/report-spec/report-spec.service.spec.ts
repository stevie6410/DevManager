/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReportSpecService } from './report-spec.service';

describe('Service: ReportSpec', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportSpecService]
    });
  });

  it('should ...', inject([ReportSpecService], (service: ReportSpecService) => {
    expect(service).toBeTruthy();
  }));
});
