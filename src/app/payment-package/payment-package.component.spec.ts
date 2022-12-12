import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPackageComponent } from './payment-package.component';

describe('PaymentPackageComponent', () => {
  let component: PaymentPackageComponent;
  let fixture: ComponentFixture<PaymentPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPackageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
