import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
  ) { }

  ngOnInit(): void {
  }
  guidelines(){

  }

  openDialog(){
    
      this.router.navigate(["payment"], {});
      return false;
  }

}
