import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.scss']
})
export class RoleDialogComponent implements OnInit {

  roleList: string[] = ['User','Insurance']
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
  save1(roleName: any){
    console.log(roleName)
    this.save(roleName)
  }
  save(roleId: any){
    if(roleId == 'User'){
      this.dialogRef.close(1);
    }
    if(roleId == 'Insurance'){
      this.dialogRef.close(3);
    }
   
  }


}
