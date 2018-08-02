import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  loggedUser = JSON.parse(sessionStorage.getItem('user'));
  isValid = true;

  constructor(private userService: UserService, private router: Router, private nav: NavService) { }

  ngOnInit() {
    if (this.loggedUser != null) {
      this.router.navigate(['dashboard']);
    }
  }

  login() {
    this.userService.loginUser(this.user).subscribe(users => {
      if (users === null || users.user_id === 0) {
        this.isValid = !this.isValid;
      } else {
        this.userService.subscribers.next(users);
        sessionStorage.setItem('user', JSON.stringify(users));
        console.log(`User, ${this.user.username}, successfully logged in!`);
        console.log(sessionStorage.getItem('user'));
        this.nav.updateNav();
        this.router.navigate(['dashboard']);
      }
    });
  }

}
