import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSideComponent } from './customer-side.component';

describe('CustomerSideComponent', () => {
  let component: CustomerSideComponent;
  let fixture: ComponentFixture<CustomerSideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerSideComponent]
    });
    fixture = TestBed.createComponent(CustomerSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
