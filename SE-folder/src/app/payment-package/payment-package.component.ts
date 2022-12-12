import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-payment-package',
  templateUrl: './payment-package.component.html',
  styleUrls: ['./payment-package.component.scss']
})
export class PaymentPackageComponent implements OnInit {

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

  save(type: any, premium: any){
    // if("user"{
    const  result ={
        type: type, 
        premium: premium
      }
      this.dialogRef.close(result);
    // })
    // if ("insur")
   
  }

}
