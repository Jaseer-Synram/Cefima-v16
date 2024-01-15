import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallInfoDialogComponent } from './call-info-dialog.component';

describe('CallInfoDialogComponent', () => {
  let component: CallInfoDialogComponent;
  let fixture: ComponentFixture<CallInfoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallInfoDialogComponent]
    });
    fixture = TestBed.createComponent(CallInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
