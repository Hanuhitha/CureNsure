import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AppService } from '../app.service';

export interface ViewApp {
  doc_user_id: string;
  note: string;
  patient_user_id: string;
  time: string;
  type: string;
}



@Component({
  selector: 'app-view-patient-appointments',
  templateUrl: './view-patient-appointments.component.html',
  styleUrls: ['./view-patient-appointments.component.scss']
})



export class ViewPatientAppointmentsComponent implements OnInit {
  displayedColumns: string[] = ['DoctorUserid', 'Note', 'Time', 'Type'];
  appointment$: Observable<any[]> | undefined;
  id: any;
  role: any;
   viewPatientAppointment: any[] =[];
  //  dataSource = ELEMENT_DATA

   dataSource= new MatTableDataSource();
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
) {
}
    

ngOnInit(): void {

  this.id = localStorage.getItem("user_id");
  this.role = localStorage.getItem("role_id");
  this.viewPatientAppointments();
}

logout(){
  localStorage.clear();
  this.router.navigate(["login"], {});
}
viewPatientAppointments(){
  const viewPatient : any = {
     request : "view_patient_appointments",
     patient_user_id : "bc9d6690"
  }
  
   this.appointment$ =  this.appService.postViewPatientAppointments(viewPatient) .pipe(
      tap(res => {console.log("appointment Details " , res);}),
      map((res) => {
        console.log('res', res);
  
  for( let i in res){
    for( let j in res[i]){
      console.log("view patient",res[i][j])
      this.viewPatientAppointment.push(res[i][j]);
    } 
  }
      return this.viewPatientAppointment;
      })
    )
    // .subscribe((res =>{
    //  
    // })

    // );
  
  }
}
