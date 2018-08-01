import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  loggedUser = sessionStorage.getItem('user');
  isValid = true;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (this.loggedUser != null) {
      this.router.navigate(['dashboard']);
    }
  }

  login() {
    this.userService.loginUser(this.user).subscribe(users => {
      if (users == null) {
        this.isValid = !this.isValid;
      } else {
        this.userService.subscribers.next(users);
        sessionStorage.setItem('user', JSON.stringify(users));
        console.log(`User, ${this.user.username}, successfully logged in!`);
        console.log(sessionStorage.getItem('user'));
        this.router.navigate(['dashboard']);
      }
    });
  }

}
