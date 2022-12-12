import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPatientAppointmentsComponent } from './view-patient-appointments.component';

describe('ViewPatientAppointmentsComponent', () => {
  let component: ViewPatientAppointmentsComponent;
  let fixture: ComponentFixture<ViewPatientAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPatientAppointmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPatientAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
