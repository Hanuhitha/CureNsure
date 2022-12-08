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
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';

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
        

        

    ],
    providers: [
        AppService,
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
              autoLogin: false,
              providers: [
                {
                  id: GoogleLoginProvider.PROVIDER_ID,
                  provider: new GoogleLoginProvider(
                    'clientId'
                  )
                },
              ],
              onError: (err) => {
                console.error(err);
              }
            } as SocialAuthServiceConfig,
          }
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
