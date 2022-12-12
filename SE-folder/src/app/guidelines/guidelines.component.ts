import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-guidelines',
  templateUrl: './guidelines.component.html',
  styleUrls: ['./guidelines.component.scss']
})
export class GuidelinesComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    // @Inject(MAT_DIALOG_DATA) public data: { appointmentReason: string}
    
    ) { }
    // public appVersion: string = version;
    // reasonForCancel: string;
    // reasonForReschedule: string;
    // acceptTermsForCancel : boolean;
    // acceptTermsForReschdule : boolean
  ngOnInit(): void {
    console.log("in guide component")
// console.log("data", this.data);
//     if(this.data.appointmentReason==="cancel"){
     
//     }else if(this.data.appointmentReason==="reschedule"){

//     }else{
//       console.log("guidelines");
//     }
  }

  
  openDialog(): void {
    this.dialog.closeAll();
  }

}
