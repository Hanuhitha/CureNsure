import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  payment: any;
  constructor(
    private snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { selectedApp: string },

  ) { }

  ngOnInit(): void {
    console.log("selected app in dialog", this.data.selectedApp)
    this.payment = this.data.selectedApp; 
    console.log("selected app in dialog", this.payment)
  }

  save(){
    // if("user"{
      this.dialogRef.close(true);
    // })
    // if ("insur")
   
  }
//  user 1 doctor 2 insu 3
}
