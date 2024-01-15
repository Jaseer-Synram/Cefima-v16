import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CefimaLoginComponent } from './cefima-login.component';

describe('CefimaLoginComponent', () => {
  let component: CefimaLoginComponent;
  let fixture: ComponentFixture<CefimaLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CefimaLoginComponent]
    });
    fixture = TestBed.createComponent(CefimaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
