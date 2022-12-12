import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, flatMap, map, Observable, pipe, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppService } from '../app.service';

interface Filter {
  value: string;
}

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  primaryDiagnosisSearchResults: any;
  primaryDiagnosisSearchCtrl = new FormControl();
  secondaryDiagnosisSearchCtrl = new FormControl();
  // selectedSecondaryDiagnosis: SnomedData[] = [];

  id = "080b730f"
  userID ="201b94f8"
  insu_id ="19f3b7a2"
  agent_id='bc9d6690'
  role: any
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
  hospitalDetails : any
  details: any;
  searchDetails: any;
  doctorSpecialities: string[] = [];
  userNotFound: boolean | undefined;
  isSearching: boolean | undefined;

  hospitalData:any[] =[];
  // value: string | null;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
) {
}
filterValue: any;
  filter: Filter[] = [
  {value: 'Name'},
  {value: 'Covid Support'},
  {value: 'Speciality'},
  {value: 'Hospital'},
];
slot = new FormGroup({
  doctor_user_id : new FormControl("", [Validators.required]),
  time: new FormControl("", [Validators.required]),
  note: new FormControl("", [Validators.required]),
  date: new FormControl("", [Validators.required]),
  })

createSlot : any;

buttonDisable: any;
doctor_user_id: any;
time: any;
note: any;
date: any;
viewDoctorAppointment:any[]=[];
viewUpcomingDoctorAppointment:any[]=[];
displayedColumns: string[] = ['DoctorUserid', 'Note', 'PatientuserID', 'Time', 'Type'];
upcomingappointment$: Observable<any[]> | undefined;
doctorappointment$: Observable<any[]> | undefined;

dataSource= new MatTableDataSource();

  ngOnInit(): void {
    // if(this.userID){
    //   this.role = "user"
    // }
    // if(this.id){
    //   this.role = "doctor"
    // }
    // if(this.insu_id){
    //   this.role = "insurance"
    // }


    this.viewDoctorAppointments()

    this.viewUpcomingDoctorAppointments()

    this.getListDetails()

    this.getDoctorDetails();

    console.log("filter",this.filter) 

    this.slot.valueChanges.subscribe((value)=>{
        
      if(this.slot.invalid){

       this.buttonDisable=true
      }else{
       this.doctor_user_id = this.slot.get('doctor_user_id')?.value;
       this.time = this.slot.get('time')?.value;
       this.note = this.slot.get('note')?.value;
       this.date = this.slot.get('date')?.value;
       this.buttonDisable=false
       
      }
     })


    this.filterType.valueChanges.subscribe((value)=>{
     
      this.filterValue = value;

      console.log("helloofilter ",this.filterValue)
     });
    this.primaryDiagnosisSearchResults = this.primaryDiagnosisSearchCtrl.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      filter(searchText => searchText.length > 2),
      flatMap(searchText => this.hospitals)
  );
  

  this.searchPatient.valueChanges.pipe(
    distinctUntilChanged(),
    debounceTime(600)
  ).
  subscribe(
    value => {
      // this.value = value;
      this.patients = [];
      this.userNotFound = false;
      if (value) {
        this.search(value);
      }
    },
    error => console.error(error)
  );

  }

    private search(value: any) {
      console.log("value", value)
    this.isSearching = true;
    this.appService.getListDetails()
    .pipe(
      tap(res => {console.log("Tap " + res);}),
      map((res) => {
        console.log('res in list ', res);
        this.searchDetails = res;
        return res;
      }),
      map ((res  => res.map((list:any) =>{
        this.searchDetails = res;
        this.primaryDiagnosisSearchCtrl.setValue("");
        console.log('res in list ', );
      }))
  
      ),
    )
  
    .subscribe(res => {
     console.log(res)
     
    });
  }

  viewDoctorAppointments(){
    const viewDoctor:any={
      request: "view_doctor_appointments", 
      doc_user_id:"080b730f"
    }
  
    this.doctorappointment$ =  this.appService.viewDoctorAppointments(viewDoctor) .pipe(
      tap(res => {console.log("Doctor appoinemtn Details " , res);}),
      map((res) => {
        console.log('res', res);
  
    for( let i in res){
      for( let j in res[i]){
        // console.log("view doctor",res[i][j])
        this.viewDoctorAppointment.push(res[i][j]);
      }
    }
      return this.viewDoctorAppointment;
    }))
  }

  viewUpcomingDoctorAppointments() {
    const upcomingAPPTS:any={request: "upcoming_doctor_appointments", doc_user_id:"080b730f"}

    this.upcomingappointment$ =  this.appService.viewUpcomingDoctorAppointments(upcomingAPPTS) .pipe(
      tap(res => {console.log("upcomingappointment Details " , res);}),
      map((res) => {
        console.log('res', res);
  
    for( let i in res){
      for( let j in res[i]){
        // console.log("view doctor",res[i][j])
        this.viewUpcomingDoctorAppointment.push(res[i][j]);
      }
    }
      return this.viewUpcomingDoctorAppointment;
    }))
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

  getvalue(result: any){
    // console.log("resssss",result , this.details , this.hospitalData)


    for( let i in this.hospitalData){
   if(this.hospitalData[i]?.hospital_name === result ){
      this.hospitalDetails = this.hospitalData[i]
      console.log("hos[ital details",this.hospitalDetails )
    }
    }

  }

  
getListDetails(){
  console.log("in funtion");
    this.appService.getListDetails()
    
  .pipe(
    tap(res => {console.log("Tapppppp list ",res);}),
    map((res) => {
      // console.log('res in listtttt ', res[2][j]);
        for(let p in res){
          // console.log("p", p, res[p])
          for(let j in res[p]){
            // console.log("hee")
            console.log("list of dataaaa", j, res[p])

            // for(let k in res[p][j]){
              if(res[p][j]?.hospital_name){
                console.log("hospital name",res[p][j]?.hospital_name)
                this.hospitalData.push(res[p][j])
                this.hospitals.push(res[p][j].hospital_name) 

              }
          } } 

      this.searchDetails = res;
      console.log(this.hospitals)
      return res;
      
    }),
    map ((res  => res.map((list:any) =>{
      this.searchDetails = res;
      this.primaryDiagnosisSearchCtrl.setValue("");
      // console.log('res in list ', this.searchDetails);
    }))

    ),
  )
  .subscribe(res => {
  //  console.log("",res)
   
  });
}

openDialog(): void {
  this.router.navigate(["bookappointment"], {});
  }
openRegistration(){
  this.isLoading = true;
  this.router.navigate(["bookappointment"], {});
  return false;
}
logout(){
  localStorage.clear();
  console.log("logoout")
  this.router.navigate(["login"], {});
  }
}
