import { Component, OnInit, DoCheck } from '@angular/core';
import { User } from '../models/user';
import { Router } from '../../../node_modules/@angular/router';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  loggedUser: User = JSON.parse(sessionStorage.getItem('user'));
  changeDetected = false;
  constructor(private router: Router, private nav: NavService) { }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngDoCheck() {
    if (this.loggedUser !== JSON.parse(sessionStorage.getItem('user'))) {
      this.changeDetected = true;
    }

    if (this.changeDetected) {
      this.loggedUser = JSON.parse(sessionStorage.getItem('user'));
    }
  }

  logout() {
    sessionStorage.setItem('user', null);
    this.router.navigate(['login']);
  }
}
