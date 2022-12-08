import { Component, Input, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take, tap } from 'rxjs/operators';
import { AppService } from '../app.service';


export class login {
  userid:any;   
  request :any;
  password : any;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})



export class LoginComponent implements OnInit {

  @Input() appointments: any;
    isLoading = false;
    buttonDisable=true
    loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password : new FormControl("", [Validators.required])
    })
    username :any;
    password : any;
    errorMsg = "";
    response : any;
    id: any;
    status: any;

    invalid: boolean = false;
    guser: any;
    signIn = 'onSignIn'

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private appService: AppService,
        // private meta: Meta,
        ngZone : NgZone
    ) {
      //   window['onSignIn'] = user => ngZone.run(
      //     () => {
      //       this.afterSignUp(user);

      //   }

      // );

    }

    ngOnInit(): void {
      
    // this.meta.addTags([
    //   {
    //     name : 'google-signin-client_id', 
    //     content : '146805086224-0rivqo2g0unaddus199a5f2klr4h82o5.apps.googleusercontent.com'
    //   }
    // ])
      

      this.getListDetails()

      this.loginForm.valueChanges.subscribe((value)=>{
        
       if(this.loginForm.invalid){

        this.buttonDisable=true
       }else{
        this.username = this.loginForm.get('email')?.value;
        this.password = this.loginForm.get('password')?.value;
        this.buttonDisable=false
       }
      })


        // this.postLoginCredentials(this.username, this.password)
 }
 afterSignUp(googleUser: any){
  this.guser = googleUser
 }


    postLoginCredentials(){
      const loginData : login = {
        userid : this.username,
        password: this.password,
        request: "login"
      }

      if ( this.password === "1212"){
        this.invalid = true;
        this.buttonDisable=true;
      }
      console.log("login data", loginData)
      this.appService.postLoginCredentials(loginData).pipe(
        take(1),
        tap(res => {console.log("Tap " + res);}),
        map((res) => {
          console.log('res', res);
          // this.id = res?.id;
          // this.status = res?.Login_Success;
          return res;
        }))
      .subscribe(res => {
        this.response = res;
        console.log("this.response", this.response, this.response.Login_Success)
        this.id = this.response.id;
        this.status = this.response.Login_Success;
        if (this.id){
          console.log("login successful");
          this.continueToHome();
        } else {
          console.log("login unsuccessful",this.status );
          this.buttonDisable=true;
          this.invalid = true;
  
        }
      });

     
    }


    getListDetails(){
      console.log("in fduntion");
        this.appService.getListDetails()
        
      .pipe(
        tap(res => {console.log("Tap " + res);}),
        map((res) => {
          console.log('res', res);
          return res;
        })
      )

      .subscribe(res => {
        this.appointments = res;
       
      });
    }

    

    continueToHome() {
        this.isLoading = true;
        this.router.navigate(["home"], {});
        return false;
    }
    openRegistration(){
      this.isLoading = true;
      this.router.navigate(["register"], {});
      return false;
    }


}