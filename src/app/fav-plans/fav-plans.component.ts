import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-fav-plans',
  templateUrl: './fav-plans.component.html',
  styleUrls: ['./fav-plans.component.scss']
})
export class FavPlansComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
  ) { }

  ngOnInit(): void {
  }
  logout(){
    localStorage.clear();
    console.log("logoout")
    this.router.navigate(["login"], {});
    }
}
