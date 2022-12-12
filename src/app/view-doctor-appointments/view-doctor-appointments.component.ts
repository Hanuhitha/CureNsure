import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, map, Observable } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-view-doctor-appointments',
  templateUrl: './view-doctor-appointments.component.html',
  styleUrls: ['./view-doctor-appointments.component.scss']
})
export class ViewDoctorAppointmentsComponent implements OnInit {
  displayedColumns: string[] = ['DoctorUserid', 'Note', 'PatientuserID', 'Time', 'Type'];
  appointment$: Observable<any[]> | undefined;

   viewDoctorAppointment: any[] =[];
   dataSource= new MatTableDataSource();
  
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
  ) { 
  }
  
  ngOnInit(): void {
    this.viewDoctorAppointments()
  }

  
  viewDoctorAppointments(){
    const viewDoctor:any={
      request: "view_doctor_appointments", 
      doc_user_id:"080b730f"
    }
  
    this.appointment$ =  this.appService.postViewPatientAppointments(viewDoctor) .pipe(
      tap(res => {console.log("appointment Details " , res);}),
      map((res) => {
        console.log('res', res);
  
    for( let i in res){
      for( let j in res[i]){
        // console.log("view doctor",res[i][j])
        this.viewDoctorAppointment.push(res[i][j]);
      }
    }
      return this.viewDoctorAppointment;
    }))}
}

