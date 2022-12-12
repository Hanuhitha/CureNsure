import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, flatMap, map, Observable, pipe, tap } from 'rxjs';
import { AppService } from '../app.service';
import { GuidelinesComponent } from '../guidelines/guidelines.component';
import { PaymentComponent } from '../payment/payment.component';

interface Filter {
  value: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {
  primaryDiagnosisSearchResults: any;
  primaryDiagnosisSearchCtrl = new FormControl();
  secondaryDiagnosisSearchCtrl = new FormControl();
  // selectedSecondaryDiagnosis: SnomedData[] = [];
  insurancedata: any;
  id = "080b730f"
  userID ="201b94f8"
  insu_id ="19f3b7a2"
  agent_id='bc9d6690'
  role: any
  temp:any
  showcurrent: any;
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
  appointment_id: any;
  searchDetails: any;
  doctorSpecialities: string[] = [];
  userNotFound: boolean | undefined;
  searchdone: boolean = false;
  isSearching: boolean | undefined;
  updatedAppointments : any[] =[];
  selectedApp: any;
  all: boolean= false;
  package_type : string[] =[ "all"]
  book: boolean = false;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  timeSelected: boolean = false;
  isLinear = false;
  hospitalData:any[] =[];
  viewPatientAppointment: any[] = [];
  packages: any;
  data: any;

  viewUpcomingPatientAppointment:any[]=[];
  displayedColumns: string[] = ['DoctorUserid', 'Note', 'PatientuserID', 'Time', 'Type'];
  upcomingappointment$: Observable<any[]> | undefined;
  dataSource= new MatTableDataSource();

  
  // value: string | null;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private _formBuilder: FormBuilder,
    // public dialogRef: MatDialogRef<GuidelinesComponent>,
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
) {
}
filterValue: any;
  filter: Filter[] = [
  {value: 'Name'},
  {value: 'Covid Support'},
  {value: 'Speciality'},
  {value: 'Hospital'},
];

  ngOnInit(): void {
    this.showcurrent = false;
    // if(this.userID){
    //   this.role = "user"
    // }
    // if(this.id){
    //   this.role = "doctor"
    // }
    // if(this.insu_id){
    //   this.role = "insurance"
    // }
    this.getListDetails()
    // this.set();
    this.getDoctorDetails();
    this.viewUpcomingPatientAppointments()

    console.log("filter",this.filter) 

    this.filterType.valueChanges.subscribe((value)=>{
     
      this.filterValue = value;
      this.searchdone=false;
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
//  transform(languages: string[], searchInput: string): any[]{
//       if(!searchInput) {
//           return  [];
//       }

//      searchInput = searchInput.toLowerCase();
//      return languages.filter(
//          x =>x.toLowerCase().includes(searchInput)
//      )
//    }

viewUpcomingPatientAppointments(){

  const viewUpcomingPatient : any = {request: "upcoming_patient_appointments", patient_user_id:"bc9d6690"}
  
   this.upcomingappointment$ =  this.appService.viewUpcomingPatientAppointments(viewUpcomingPatient) .pipe(
      tap(res => {console.log("appointment Details " , res);}),
      map((res) => {
        console.log('res', res);
  
    for( let i in res){
      for( let j in res[i]){
        console.log("view patient",res[i][j])
        this.viewUpcomingPatientAppointment.push(res[i][j]);
      }
    }
      return this.viewUpcomingPatientAppointment;
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



  
  bookAppointment(){
    this.book =  true;
    this.data = {
      request: "view_doctor_slots", 
      doc_user_id: "080b730f"
    }
    

    this.appService.postAppointment(this.data).pipe(
      tap(res => {console.log("Tap ", res);
    }),
      map((res) => {
        console.log('res appointnemt list ', res[0]);
        

        for(let i in res){
          
        for( let j in res[i]){
          let new_dict = {
            appointment_id :'',
            date:'',
            ampm:'',
            time:"",
            note: '',
            doc_user_id: '',
          };
         
          console.log("in console", j, res[i][j])
          this.appointment_id = j
          this.temp = res[i][j];
          new_dict['note'] = this.temp['note'];
          new_dict['doc_user_id'] = this.temp['doc_user_id'];
          var time_info = this.temp['time'];
          var datatime = time_info.split("T");
          new_dict['date'] = datatime[0];
          var new_time =  datatime[1].split(":");
          var hour = Number(new_time[0]);
          var ampm:any;
          if (hour-12 >=0){
            hour = hour - 12;
            if (hour == 0){
              hour = 12;
            }
              ampm = "pm";
            
            
          } 
          else{
            if (hour == 0){
              hour = 12;
            }
      
            ampm = "am";
      
          }
          new_time[0] = String(hour)
          new_dict['time'] = new_time.join(":");
          new_dict['ampm'] = ampm
          new_dict['appointment_id'] = this.appointment_id;




          this.updatedAppointments.push(new_dict)

        }
        }

        console.log('res appointnemt list ', this.updatedAppointments);

        return res;
      }), ).subscribe()



  }

  logout(){
    localStorage.clear();
    this.router.navigate(["login"], {});
  }

  guidelines(){

    console.log("in guide")
    const dialogRef = this.dialog.open(GuidelinesComponent, {
      width: "80%",
     
    });}

payment(){

  console.log("medappointment", this.selectedApp)
  const dialogRef = this.dialog.open(PaymentComponent, {
      width: "850px",
      data: {
        selectedApp: this.selectedApp
      }
  });

  dialogRef.afterClosed().subscribe( result => {
    console.log("Result after dialog close ", result);
    if (result) {
      this.searchdone = false
      this.book =false
        this.snackbar.open('Payment is succesfull', '', {duration: 3000});

      this.showcurrent = true;
    }
});

}
openDialog(){

}

  selectedTime(app: any){
    console.log("selected appointtmne", app)
this.timeSelected = true;

this.selectedApp = app
  }
  // time(data:any)
  // {
  //   // let new_dict = {};

     
  
  //   for(let i of data){
  
  
  //      this.temp = data[i];
  //      var appt_id = i
  //      new_dict['note'] = this.temp['note'];
  //      new_dict['doc_user_id'] = this.temp['doc_user_id'];
  //      var time_info = this.temp['time'];
  //      var datatime = time_info.split("T");
  //      new_dict['date'] = datatime[0];
  //      var new_time =  datatime[1].split(":");
  //      var hour = Number(new_time[0]);
  //      var ampm:any;
  //      if (hour-12 >=0){
  //       hour = hour - 12;
  //       if (hour == 0){
  //         hour = 12;
  //       }
  //         ampm = "pm";
        
        
  //      } 
  //      else{
  //       if (hour == 0){
  //         hour = 12;
  //       }
  
  //       ampm = "am";
  
  //      }
  //      new_time[0] = String(hour)
  //      new_dict['time'] = new_time.join(":");
  //      new_dict['ampm'] = ampm
  //      new_dict['appointment_id'] = appt_id;
  //      this.updated_array.push(new_dict)
  
  
  //   }


  getvalue(result: any){
    // console.log("resssss",result , this.details , this.hospitalData)

this.book =  false;
    for( let i in this.hospitalData){
   if(this.hospitalData[i]?.hospital_name === result ){
      this.hospitalDetails = this.hospitalData[i]
      this.searchdone=true;
      console.log("hos[ital details",this.hospitalDetails )
 
        // const dialogRef = this.dialog.open(LearnAboutAppComponent, {
        //     width: "900px",
        //     height: "600px",

        // });
        // dialogRef.afterClosed().subscribe((res: any) => {
        //     console.log(res,"The dialog was closed");
        // });



    }
    }
     
 
    

  }
  // event: MatAutocompleteSelectedEvent
//  getSpecialities() {
//         return this.httpClient.get('/assets/data/specialities.json').pipe(
//             map((result: any) => result.message),
//             tap(res => console.log("message",res)),
            
//             map(specialities => specialities.map((speciality: any) => {
//               this.doctorSpecialities = specialities;
//               // this.primaryDiagnosisSearchCtrl.setValue("");
//               // console.log("details", this.primaryDiagnosisSearchResults);
//               for (const i of specialities) {
//                         this.doctorSpecialities.push(speciality.title);
//                         console.log("details", i);
//                     }
//               return {
//                 // specialityId: speciality.slug,
//                 specialityName: speciality.title
//               }
//             })),
            
//         )
//     }
  openFav(){

    console.log("hello")
      this.isLoading = true;
      this.router.navigate(["favrorites"], {});
      // return false;
  }
getListDetails(){
  console.log("in funtion");
    this.appService.getListDetails()
    
  .pipe(
    tap(res => {console.log("Tap ",res);}),
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


}



// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//     name:'search'
// })

// export class SearchPipe implements PipeTransform {
//     transform(languages: string[], searchInput: string): any[]{
//         if(!searchInput) {
//             return  [];
//         }

//        searchInput = searchInput.toLowerCase();
//        return languages.filter(
//            x =>x.toLowerCase().includes(searchInput)
//        )
//      }
// }

// import { Pipe, PipeTransform } from '@angular/core';



// export class SearchPipe implements PipeTransform {
//     transform(languages: string[], searchInput: string): any[]{
//         if(!searchInput) {
//             return  [];
//         }

//        searchInput = searchInput.toLowerCase();
//        return languages.filter(
//            x =>x.toLowerCase().includes(searchInput)
//        )
//      }
// }

