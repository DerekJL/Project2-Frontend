import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  loggedUser = localStorage.getItem('user');
  isValidEmail = true;
  isValidUsername = true;
  isValidFirstName = true;
  isValidLastName = true;
  isValidPhoneNumber = true;
  isValidPassword = true;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (this.loggedUser !== null) {
      this.router.navigate(['dashboard']);
    }
  }

  validEmail() {
    this.userService.isEmailAvailable(this.user).subscribe(users => {
      if (users !== null) {
        this.isValidEmail = !this.isValidEmail;
      } else if (!this.validateEmail(this.user.email)) {
        this.isValidEmail = !this.isValidEmail;
      }
    });
  }

  validateEmail(email: string): boolean {
    const regularExpression = /^([a-zA-Z0-9_\.\-+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (email.length === 0) {
      return false;
    }
    return regularExpression.test(email);
  }

  validUsername() {
    this.userService.isUsernameAvailable(this.user).subscribe(users => {
      if (users !== null) {
        this.isValidUsername = !this.isValidUsername;
      } else if (!this.validateUsername(this.user.username)) {
        this.isValidUsername = !this.isValidUsername;
      }
    });
  }

  validateUsername(username: string): boolean {
    if (username.length === 0 || username.length > 50) {
      return false;
    }
    return true;
  }

  register() {
    if (this.isValidEmail && this.isValidUsername && this.validFields()) {
      // Disable register button
      this.userService.registerUser(this.user).subscribe((users) => {
        if (users === null) {
          // Why would a user return null here?
        } else {
          this.userService.subscribers.next(users);
          localStorage.setItem('user', JSON.stringify(users));
          console.log(localStorage.getItem('user'));
          this.router.navigate(['dashboard']);
        }
      });
    } else {
      // Something to go here
    }
  }

  validFields() {
    if (this.user.firstname.length < 2) {
      this.isValidFirstName = !this.isValidFirstName;
    } else if (this.phonenumber(!this.user.phone)) {
      this.isValidPhoneNumber = !this.isValidPhoneNumber;
    } else if (this.user.lastname.length < 2) {
      this.isValidLastName = !this.isValidLastName;
    } else if (this.user.password.length < 8) {
      this.isValidPassword = !this.isValidPassword;
    }
  }

  phonenumber(phone) {
    const format = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phone.value.match(format)) {
      return true;
    } else {
      return false;
    }
   }
}
