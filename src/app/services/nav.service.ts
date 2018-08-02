import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  loggedUser: User;
  loggedIn: boolean;
  constructor() { }

  public updateNav() {
    this.loggedUser = JSON.parse(sessionStorage.getItem('user'));
    this.loggedIn = (this.loggedUser === null) ? false : true;
  }
}
