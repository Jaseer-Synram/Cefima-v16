import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bCreateCustomerComponent } from './b2b-create-customer.component';

describe('B2bCreateCustomerComponent', () => {
  let component: B2bCreateCustomerComponent;
  let fixture: ComponentFixture<B2bCreateCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [B2bCreateCustomerComponent]
    });
    fixture = TestBed.createComponent(B2bCreateCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
