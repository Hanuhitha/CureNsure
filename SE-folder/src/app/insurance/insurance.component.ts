import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, flatMap, tap, map } from 'rxjs';
import { AppService } from '../app.service';

interface Filter {
  value: string;
}
export interface InsurancePlan {
  id: string;
  position: number;
  premium: string;
  type: string;
}

const ELEMENT_DATA: InsurancePlan[] = [
  {position: 1, id: 'bc9d6690', premium: '$1000', type: 'bronze'},
  {position: 2, id: 'bc9d6690', premium: '$2500', type: 'gold'},
  {position: 3, id: 'bc9d6690', premium: '$5732', type: 'diamond'},
];

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit {

  primaryDiagnosisSearchResults: any;
  primaryDiagnosisSearchCtrl = new FormControl();
  secondaryDiagnosisSearchCtrl = new FormControl();
  // selectedSecondaryDiagnosis: SnomedData[] = [];

  // Table
  displayedColumns: string[] = ['select', 'position', 'id', 'premium', 'type'];
  dataSource = new MatTableDataSource<InsurancePlan>(ELEMENT_DATA);
  selection = new SelectionModel<InsurancePlan>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: InsurancePlan): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

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
                console.log("hospital nameeeee",res[p][j])
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
