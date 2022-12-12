import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInsuranceComponent } from './register-insurance.component';

describe('RegisterInsuranceComponent', () => {
  let component: RegisterInsuranceComponent;
  let fixture: ComponentFixture<RegisterInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterInsuranceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
