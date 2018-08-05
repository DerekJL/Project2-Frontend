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
  loggedUser = JSON.parse(sessionStorage.getItem('user'));
  isValid = true;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (this.loggedUser != null) {
      this.router.navigate(['dashboard']);
    }
  }

  login() {
    this.userService.loginUser(this.user).subscribe(response1 => {
      //  console.log(response1);
      if (!response1) {
        this.isValid = false;
      } else {
        this.userService.getUserByUsername(this.user).subscribe(response2 => {
          this.user = response2;
          sessionStorage.setItem('user', JSON.stringify(this.user));
          // console.log(sessionStorage.getItem('user'));
          this.router.navigate(['dashboard']);
        });
      }
    });
  }

}
