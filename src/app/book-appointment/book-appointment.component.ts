import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})
export class BookAppointmentComponent implements OnInit {
  id: any;
  role: any;
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.id = localStorage.getItem("user_id");
    this.role = localStorage.getItem("role_id");
  }
  logout(){
    localStorage.clear();
    this.router.navigate(["login"], {});
  }
}
