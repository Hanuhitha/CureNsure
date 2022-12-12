import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { DoctorComponent } from './doctor/doctor.component';
import { FavPlansComponent } from './fav-plans/fav-plans.component';
import { HomeComponent } from './home/home.component';
import { InsuranceHomeComponent } from './insurance-home/insurance-home.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterInsuranceComponent } from './register-insurance/register-insurance.component';
import { RegisterComponent } from './register/register.component';
import { UpdateInsuranceComponent } from './update-insurance/update-insurance.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { ViewDoctorAppointmentsComponent } from './view-doctor-appointments/view-doctor-appointments.component';
import { ViewPatientAppointmentsComponent } from './view-patient-appointments/view-patient-appointments.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'doctor', component: DoctorComponent },
  { path: 'register', component: RegisterComponent },

  {path: 'register/:roleId', component: RegisterComponent},
  // { path: '**', component: LoginComponent },
  // { path: 'register_page', component: LoginComponent },
  {path: 'bookappointment', component: BookAppointmentComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'favorites', component: FavPlansComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'register_insurance', component: RegisterInsuranceComponent},
  {path: 'insurance_home', component: InsuranceHomeComponent},
  {path: 'update_insurance', component: UpdateInsuranceComponent},
  {path: 'update_patient', component: UpdatePatientComponent},
  {path: 'view_appointment_doctor', component: ViewDoctorAppointmentsComponent},
  {path: 'view_appointment_patient', component: ViewPatientAppointmentsComponent}
  




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
