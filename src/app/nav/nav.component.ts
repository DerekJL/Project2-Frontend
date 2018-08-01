import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  loggedUser: User = JSON.parse(sessionStorage.getItem('user'));

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout(){
    this.loggedUser = null;
    this.router.navigate(['login']);
  }
}
