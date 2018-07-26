import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;
  loggedUser = JSON.parse(localStorage.getItem('user'));

  constructor(private router: Router) { }

  ngOnInit() {
    // if (this.loggedUser === null) {
    //   this.router.navigate(['login']);
    // } else {
    //   this.user = this.loggedUser;
    // }
  }

}
