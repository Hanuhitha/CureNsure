import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, map, filter, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppService } from '../app.service';
import { DialogPackageComponent } from '../dialog-package/dialog-package.component';
import { PaymentPackageComponent } from '../payment-package/payment-package.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  
})
export class UserComponent implements OnInit {

  medexPackages: any;
  diamond =false;
  gold= false;
  bronze = false;
  packages: any;
  updatedpackage: any;
  packageSearchFormControl = new FormControl();
  insurancedata: any;
  medexUid: any;
  showloader = false;
  packagesCart: any[] = [];
  all: boolean= false;
  package_type : string[] =[ "all"]
  foundItem : boolean | undefined;
  details: any;
  id : any;
  premiaum: any = "$1000";

  plan_type = "GOLD"

  role: any;
  constructor(
    private appService: AppService,
    private router: Router,
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
   
    this.id = localStorage.getItem("user_id");
    this.role = localStorage.getItem("role_id");

    console.log("role and id",this.role , this.id )
    this.insurancedata = {
      request: "view_agent_plans", 
      agent_user_id: "6abd7094"
    }

    this.appService.postInsurance(this.insurancedata).pipe(
      tap(res => {console.log("Tap " + res);}),
      map((res) => {
        console.log('res insurance list ', res);

        for(let i in res){
          
          this.package_type.push(res[i].plan_type)
        }
        return res;
      }),
    ).subscribe((res) => {

      this.packages = res
      console.log("packages" ,this.packages)
    })


    // this.medexPackages = this.medexPackagesService.getMedexPackages();


    // this.medexPackagesService.packagesCart$.subscribe((packagesCart: any[]) => {
    //   console.log("array", packagesCart);
    //   this.packagesCart = packagesCart;
    // });


    this.packageSearchFormControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      // filter(searchText => searchText.length > 2),
      map(searchText => this.package_type)

    ).subscribe(() => { 
      
    });
    this.getDoctorDetails()
  }
  getDoctorDetails(){
    console.log("in fduntion");
        this.appService.getListDetailsById(this.id)
        
      .pipe(
        tap(res => {console.log("id details " + res);}),
        map((res) => {
          console.log('res', res);
          this.details = res;
          return res;
        })
      )
      .subscribe(res => {
        // this.details = res;
        console.log("hello",this.details)
       
      });
  }
  getvalue(res: any){
    console.log("selected plan", res)

    if(res==="bronze"){
      this.bronze = true;

      // for( let i in res){
      //   if(this.packages.plan_type === res){

      //     this.packages.push(this.packages)
      //     console.log("up", this.packages)
      //   }
      // }
    }
    if(res==="gold"){
      this.gold = true;
    }
    if(res==="diamond"){
      this.diamond = true;
    }
    if(res==="all"){
      this.all = true;
    }
  }
  chooseToSelect(packageDetails: { tests: any[]; }) {
    console.log("package", packageDetails);
    const findMultiSelectSpeciality = packageDetails.tests.find((test: { speciality: any; }) => typeof (test.speciality) === typeof ([""]))
    const dialogRef = this.dialog.open(DialogPackageComponent, {
      width: "50vw",
      data: findMultiSelectSpeciality.speciality,
    });
    dialogRef.afterClosed().subscribe((selectedSpeciality) => {
      if(selectedSpeciality){
        const consultation={
          categoryName:"Consultations",
          test:{
            packageId:"Kiosk_selected_consultation",
            testId:`${selectedSpeciality.split(" ").join("_")}_consultation`,
            testName:`${selectedSpeciality} Consultation`,
            testType:"consultation",
            speciality:selectedSpeciality,
            price:0,
            icon:"doctor"
          }
        }
        // this.medexPackagesService.addToPackagesCart(packageDetails,consultation);
        this.snackbar.open('Package added to cart successfully', '', {duration: 3000});
      }
      
    })
  }

  addToCart(packageDetails: any) {
    console.log("package", packageDetails);
    const dialogRef = this.dialog.open(PaymentPackageComponent, {
      width: "850px",
      data: {
        selectedApp: packageDetails
      }
  });
  dialogRef.afterClosed().subscribe( result => {
    console.log("Result after dialog close ", result);
    if (result) {
      
      this.snackbar.open('Payment is successfull', '', { duration: 3000 });
      this.plan_type = result.type
      this.premiaum = result.premium
        this.set();

      
    }
});
    // this.medexPackagesService.addToPackagesCart(packageDetails);
    
    // this.foundItem = true;


    //     dialog 
   
//  data lo packageDetails

 // dialog close

    // this.packageExistsInCart(packageDetails)
  }

  set(){
    this.insurancedata = {
      request: "set_plan", 
      plan_id: "c02cbae8",
      patient_user_id: "bc9d6690"
    }

    this.appService.postInsurance(this.insurancedata).pipe(
      tap(res => {console.log("Tap " + res);}),
      map((res) => {
        console.log('res insurance list ', res);

        for(let i in res){
          
          this.package_type.push(res[i].plan_type)
        }
        return res;
      }),
    ).subscribe((res) => {

      this.packages = res
      console.log("packages" ,this.packages)

    })
    
  }

  packageExistsInCart(packageDetails: { packageName: any; }) {
    
    if (this.foundItem == true) {
      return true;
    } else {
      return false;
    }
  }

  isMultiSelectPackage(packagetype: string) {
    console.log("type ee",packagetype )
    if (packagetype === "bronze" || packagetype === "gold") {
      return true
    }
    return false
  }

  buyPackage(packageDetails: { packageId: any; packageName: any; price: number; }) {
    this.showloader = true;
    console.log("package", packageDetails);
    const packageOrder = {
      userReferenceId: this.medexUid,
      packageList: [{
        packageId: packageDetails.packageId,
        packageName: packageDetails.packageName,
        amountInPaise: packageDetails.price * 100
      }],
      redirectUrl: `${window.location.origin}/patient/${this.medexUid}/packages/payment/success`
    };

  
  }

  guidelines(){

  }

  makePayment(){
    
  }
}
function flatMap(arg0: (searchText: any) => any): import("rxjs").OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');
}

