import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap, map, debounceTime, distinctUntilChanged } from 'rxjs';
import { AppService } from '../app.service';
import { DialogPackageComponent } from '../dialog-package/dialog-package.component';

@Component({
  selector: 'app-insurance-home',
  templateUrl: './insurance-home.component.html',
  styleUrls: ['./insurance-home.component.scss']
})
export class InsuranceHomeComponent implements OnInit {

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
  constructor(
    private appService: AppService,
    private snackbar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  updatep = new FormGroup({
    plan_id : new FormControl("", [Validators.required]),
    plan_type: new FormControl("", [Validators.required]),
    monthly_premium: new FormControl("", [Validators.required]),
  })

  addp = new FormGroup({
    agent_user_id : new FormControl("", [Validators.required]),
    plan_type2: new FormControl("", [Validators.required]),
    monthly_premium2: new FormControl("", [Validators.required]),
  })

  buttonDisable: any;
  buttonDisable2:any;
  agent_user_id: any;
  plan_id: any;
  plan_type: any;
  plan_type2: any;
  monthly_premium: any;
  monthly_premium2: any;

  ngOnInit(): void {
    const url = this.router.url?.split('/');
    this.medexUid = url.find((item) => item.startsWith('medex'));
    console.log('medexUID', this.medexUid);
    this.insurancedata = {
      request: "view_agent_plans", 
      agent_user_id: "6abd7094"
    }
    this.view();
    this.update();
    this.add();
  
    this.total();
    this.updatep.valueChanges.subscribe((value)=>{
        
      if(this.updatep.invalid){
       this.buttonDisable=true
      }else{
       this.plan_id = this.updatep.get('plan_id')?.value;
       this.plan_type = this.updatep.get('plan_type')?.value;
       this.monthly_premium = this.updatep.get('monthly_premium')?.value;
       this.buttonDisable=false;
      }
     })

     this.addp.valueChanges.subscribe((value)=>{
      if(this.addp.invalid){
       this.buttonDisable2=true
      }else{
       this.agent_user_id = this.addp.get('agent_user_id')?.value;
       this.plan_type2 = this.addp.get('plan_type2')?.value;
       this.monthly_premium2 = this.addp.get('monthly_premium2')?.value;
       this.buttonDisable2=false;
      }
    })
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
  }
  view(){
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
  }

  update(){
    this.insurancedata = {
      request: "update_IPlan", 
      plan_id: "c02cbae8",
      plan_type: "diamond",
      monthly_premium: "$5732"
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

  add(){
    this.insurancedata = {
      request: "add_IPlan", 
      agent_user_id: "bc9d6690", 
      plan_type: "diamond", 
      monthly_premium:"$0"
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


  total(){
    this.insurancedata = {
      request: "get_total_and_recurring_bills", 
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
    // this.medexPackagesService.addToPackagesCart(packageDetails);
    this.snackbar.open('Package added to cart successfully', '', { duration: 3000 });
    this.foundItem = true;
    this.packageExistsInCart(packageDetails)
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
  logout(){
    localStorage.clear();
    this.router.navigate(["login"], {});
  }
  makePayment(){
    
  }
}
function flatMap(arg0: (searchText: any) => any): import("rxjs").OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');
}
