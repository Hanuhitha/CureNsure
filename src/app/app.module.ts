import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MedexMaterialModule} from "./app-ui.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppService } from './app.service';
import { HttpClientModule} from '@angular/common/http';
import { DoctorComponent } from './doctor/doctor.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { UserComponent } from './user/user.component';
import { ListDoctorComponent } from './list-doctor/list-doctor.component';
import { PaymentComponent } from './payment/payment.component';
import { VitaUtilitiesModule } from 'src/assets/vita-utilities/vita-utilities.module';
import { SummaryComponent } from './summary/summary.component';
import { DoctorHomeComponent } from './doctor-home/doctor-home.component';
import { InsuranceHomeComponent } from './insurance-home/insurance-home.component';
import { DialogPackageComponent } from './dialog-package/dialog-package.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { FavPlansComponent } from './fav-plans/fav-plans.component';
import { RegisterInsuranceComponent } from './register-insurance/register-insurance.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleAppComponent } from './schedule-app/schedule-app.component';
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateInsuranceComponent } from './update-insurance/update-insurance.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { PaymentPackageComponent } from './payment-package/payment-package.component';
import { RoleDialogComponent } from './role-dialog/role-dialog.component';
import { ViewDoctorAppointmentsComponent } from './view-doctor-appointments/view-doctor-appointments.component';
import { ViewPatientAppointmentsComponent } from './view-patient-appointments/view-patient-appointments.component';
// import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
// import {
//   GoogleLoginProvider,
// } from '@abacritt/angularx-social-login';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        RegisterComponent,
        DoctorComponent,
        InsuranceComponent,
        UserComponent,
        ListDoctorComponent,
        PaymentComponent,
        DoctorHomeComponent,
        PaymentPackageComponent,
        DialogPackageComponent,
        SummaryComponent,
        BookAppointmentComponent,
        FavPlansComponent,
        RegisterInsuranceComponent,
        ScheduleComponent,
        ScheduleAppComponent,
        GuidelinesComponent,
        ProfileComponent,
        UpdateInsuranceComponent,
        UpdatePatientComponent,
        InsuranceHomeComponent,
        RoleDialogComponent,
        ViewDoctorAppointmentsComponent,
        ViewPatientAppointmentsComponent

        

    ],
    providers: [
        AppService,
        // {
        //     provide: 'SocialAuthServiceConfig',
        //     useValue: {
        //       autoLogin: false,
        //       providers: [
        //         {
        //           id: GoogleLoginProvider.PROVIDER_ID,
        //           provider: new GoogleLoginProvider(
        //             'clientId'
        //           )
        //         },
        //       ],
        //       onError: (err) => {
        //         console.error(err);
        //       }
        //     } as SocialAuthServiceConfig,
        //   }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MedexMaterialModule,
        HttpClientModule,
        VitaUtilitiesModule,

        
        
    ]
})
export class AppModule { }
