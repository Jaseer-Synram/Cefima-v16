import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySelectDialogComponent } from './company-select-dialog.component';

describe('CompanySelectDialogComponent', () => {
  let component: CompanySelectDialogComponent;
  let fixture: ComponentFixture<CompanySelectDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanySelectDialogComponent]
    });
    fixture = TestBed.createComponent(CompanySelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
