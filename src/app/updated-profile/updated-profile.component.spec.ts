import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedProfileComponent } from './updated-profile.component';

describe('UpdatedProfileComponent', () => {
  let component: UpdatedProfileComponent;
  let fixture: ComponentFixture<UpdatedProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatedProfileComponent]
    });
    fixture = TestBed.createComponent(UpdatedProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
