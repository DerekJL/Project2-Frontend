import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = new User();
  loggedUser: User = JSON.parse(sessionStorage.getItem('user'));
  constructor(private router: Router) { }

  ngOnInit() {
    if (this.loggedUser === null) {
      this.router.navigate(['login']);
    } else {
      this.user = this.loggedUser;
    }
  }

}
