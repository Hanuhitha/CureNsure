import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.scss']
})
export class UpdatePatientComponent implements OnInit {

  genderList: string[] = ['Male', 'Female', 'Other'];
  titles: string[] = ['Mr', 'Mrs', 'Miss'];
  relations: string[] = ['S/o', 'D/O', 'W/O', 'H/O'];
  groups: string[] = ['Unknown', 'A+', 'A', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Others'];
  religions: string[] = ['HINDU', 'MUSLIM', 'CHRISTIAN', 'SIKH', 'JAIN', 'ZOROASTRIAN', 'JUDAH'];
  statuses: string[] = ['Not applicable', 'SPOUSE EXPIRED', 'DIVORCED', 'UNMARRIED', 'MARRIED'];
  igroups: string[] = ['HIGH', 'MIDDLE', 'LOW', 'BPL'];
  aproofs: string[] = ['DRIVING LICENSE', 'PAN CARD', 'RATION CARD', 'VOTER ID', 'PASSPORT', 'SOCIAL SECURITY', 'NO ID PROOF AVAILABLE'];
  educations: any[] = [];
  occupations: any[] = [];
  states: any[] = [];
  districts: any[] = [];
  municipalities: any[] = [];
  locations: any[] = [];
  //   abs: FormDetails[] = [];
  CDATE = new Date();
  customerRangeList: string[] = ['bronze','silver','gold'];

  role : any;
  id: any;

  IDPROOF = 'ADDRESS PROOF NUMBER';
  patientRegister = new FormGroup({
      title: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      relationship: new FormControl('', [Validators.required]),
    motherName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
  
      height: new FormControl('', [Validators.maxLength(3), Validators.min(0), Validators.max(999), Validators.pattern('^[0-9]{1,3}$')]),
      weight: new FormControl('', [Validators.maxLength(3), Validators.min(0), Validators.max(999), Validators.pattern('^[0-9]{1,3}$')]),
      
      location: new FormControl(),
      city: new FormControl(),
      country: new FormControl('INDIAN'),
      address: new FormControl('', []),
      zipcode: new FormControl('', [Validators.min(100000), Validators.max(999999)]),
      
      cityPermanent: new FormControl(),
      addressPermanent: new FormControl('', []),
      zipcodePermanent: new FormControl('', [Validators.min(100000), Validators.max(999999)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.minLength(1), Validators.min(1), Validators.max(100)]),
      mobileNumber: new FormControl('', [Validators.minLength(10), Validators.min(1000000000), Validators.max(9999999999)]),
      altMobileNumber: new FormControl('', [Validators.minLength(10), Validators.min(1000000000), Validators.max(9999999999)]),

      primaryCheck: new FormControl(true),
  });

  minDob = moment((moment().startOf('day').unix() * 1000) - (101 * 365 * 86400 * 1000));
  maxDob = moment().startOf('day');
  patientInfo: any;

  triggerCapture = new Subject<boolean>();
    triggerCapture$ = this.triggerCapture.asObservable();
 
    isLoading = false;

  constructor(private router: Router,
      private activatedRoute: ActivatedRoute,
      public dialog: MatDialog,
      private _snackbar: MatSnackBar) {
      this.patientRegister.get('age');
  }

  public ngOnInit(): void {

    this.id = localStorage.getItem("user_id");
    this.role = localStorage.getItem("role_id");
      console.log('oninit reg comp');
      this.patientRegister.valueChanges.subscribe((res) => {
        console.log("response from ", res)

        const  register ={
            request : "signUp",
            user_first_name : this.patientRegister.get('firstName')?.value,
            user_last_name : this.patientRegister.get('firstName')?.value,
        }
   
 
      });
       }


  dob() {
  }

 

  

  samePermanentAddress($event: { checked: any; }) {
  }
  getAgeDetails() {
  }

  calculateDob() {
  }

  openDialog(): void {
    this.router.navigate(["profile"], {});
  }
  logout(){
    localStorage.clear();
    console.log("logoout")
    this.router.navigate(["login"], {});
    }   

  validateAllFormFields(formGroup: FormGroup) {
      Object.keys(formGroup.controls).forEach(field => {
          const control = formGroup.get(field);
          if (control instanceof FormControl) {
              control.markAsTouched({ onlySelf: true });
          } else if (control instanceof FormGroup) {
              this.validateAllFormFields(control);
          }
      });
  }

  numberOnly(event: { which: any; keyCode: any; }): boolean {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
      }
      return true;

  }

}
