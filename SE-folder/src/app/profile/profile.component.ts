import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, map } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  primaryDiagnosisSearchResults: any;
  primaryDiagnosisSearchCtrl = new FormControl();
  secondaryDiagnosisSearchCtrl = new FormControl();
  // selectedSecondaryDiagnosis: SnomedData[] = [];

  id : any
  userID ="201b94f8"
  insu_id ="19f3b7a2"
  agent_id='bc9d6690'
  role : any;
  patients = [];
  recentPatients = [];
  hospitals : string[] =[];
  isLoading = false;
  searchPatient = new FormControl('');
  globalSearch = new FormControl('');
  speciality : string[] =[];
  filterType= new FormControl('');
  searchResults: any;
  title = 'instant-search';
  public searchInput!: string;
  public lists = ['appointments','time','Tb test','covid',]

  details: any;
  searchDetails: any;
  doctorSpecialities: string[] = [];
  userNotFound: boolean | undefined;
  isSearching: boolean | undefined;
  // value: string | null;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
) {
}
  ngOnInit(): void {
    

    this.id = localStorage.getItem("user_id");
    this.role = localStorage.getItem("role_id");

    if(this.role){
      this.getDoctorDetails()
    }
    
  }
  getDoctorDetails(){
    console.log("in fduntion", this.role);
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
        this.role = localStorage.getItem("role_id");
       
      });
  }
  openRegistration(){

    this.isLoading = true;
    this.router.navigate(["update_patient"], {});
    return false;
  }
  openDialog(): void {
    // this.router.navigate(["home"], {});
  }
  openInsRegistration(){
    this.isLoading = true;
    this.router.navigate(["update_insurance"], {});
    return false;
  }
  logout(){
    localStorage.clear();
    console.log("logoout")
    this.router.navigate(["login"], {});
    }

}
