import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductpartnerCasesComponent } from './productpartner-cases.component';

describe('ProductpartnerCasesComponent', () => {
  let component: ProductpartnerCasesComponent;
  let fixture: ComponentFixture<ProductpartnerCasesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductpartnerCasesComponent]
    });
    fixture = TestBed.createComponent(ProductpartnerCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
