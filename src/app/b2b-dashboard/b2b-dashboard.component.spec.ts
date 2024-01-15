import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bDashboardComponent } from './b2b-dashboard.component';

describe('B2bDashboardComponent', () => {
  let component: B2bDashboardComponent;
  let fixture: ComponentFixture<B2bDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [B2bDashboardComponent]
    });
    fixture = TestBed.createComponent(B2bDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
