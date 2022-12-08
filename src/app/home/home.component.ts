import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, flatMap, map, Observable, pipe, tap } from 'rxjs';
import { AppService } from '../app.service';

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

  id = "080b730f"
  patients = [];
  recentPatients = [];
  isLoading = false;
  searchPatient = new FormControl('');
  globalSearch = new FormControl('');

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
filterValue: any;
  filter: Filter[] = [
  {value: 'Name'},
  {value: 'Covid Support'},
  {value: 'Speciality'},
  {value: 'Hospital'},
];

  ngOnInit(): void {
    this.getListDetails()

    this.getDoctorDetails();

    console.log("filter",this.filter) 

    this.filterType.valueChanges.subscribe((value)=>{
     
      this.filterValue = value;

      console.log("helloofilter ",this.filterValue)
     });
    this.primaryDiagnosisSearchResults = this.primaryDiagnosisSearchCtrl.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      filter(searchText => searchText.length > 2),
      // flatMap(searchText => this.contentService.searchSnomedDb(searchText))
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
  
getListDetails(){
  console.log("in funtion");
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