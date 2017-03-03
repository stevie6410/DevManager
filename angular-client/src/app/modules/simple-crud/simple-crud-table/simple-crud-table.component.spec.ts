import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleCrudTableComponent } from './simple-crud-table.component';

describe('SimpleCrudTableComponent', () => {
  let component: SimpleCrudTableComponent;
  let fixture: ComponentFixture<SimpleCrudTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleCrudTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleCrudTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
