import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSideCopyComponent } from './customer-side-copy.component';

describe('CustomerSideCopyComponent', () => {
  let component: CustomerSideCopyComponent;
  let fixture: ComponentFixture<CustomerSideCopyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerSideCopyComponent]
    });
    fixture = TestBed.createComponent(CustomerSideCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
