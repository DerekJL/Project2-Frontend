import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  loggedUser: User = JSON.parse(sessionStorage.getItem('user'));

  constructor() { }

  ngOnInit() {
  }

}
