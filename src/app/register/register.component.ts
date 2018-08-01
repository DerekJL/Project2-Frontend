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
  // loggedUser = sessionStorage.getItem('user');
  isValidEmail = true;
  isValidUsername = true;
  isValidFirstName = true;
  isValidLastName = true;
  isValidPhoneNumber = true;
  isValidPassword = true;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    // if (this.loggedUser !== null) {
    //   this.router.navigate(['dashboard']);
    // }
  }

  validEmail() {
    console.log('in validEmail()');
    this.userService.isEmailAvailable(this.user).subscribe(users => {
      console.log('received respose from call to getUsersByEmail()');
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
          sessionStorage.setItem('user', JSON.stringify(users));
          console.log(sessionStorage.getItem('user'));
          this.router.navigate(['login']);
        }
      });
    } else {
      // Something to go here
      console.log('entered the empty else statement in register()');
      console.log('valid email: ' + this.isValidEmail);
      console.log('valid username: ' + this.isValidUsername);
      console.log('valid fields: ' + this.validFields());
    }
  }

  validFields(): boolean {
    if (this.user.firstName.length < 2) {
      this.isValidFirstName = !this.isValidFirstName;
      return false;
    } else if (!this.phonenumber(this.user.phone)) {
      this.isValidPhoneNumber = !this.isValidPhoneNumber;
      return false;
    } else if (this.user.lastName.length < 2) {
      this.isValidLastName = !this.isValidLastName;
      return false;
    } else if (this.user.password.length < 8) {
      this.isValidPassword = !this.isValidPassword;
      return false;
    } else {
      return true;
    }
  }

  phonenumber(phone) {
    const format = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phone.match(format)) {
      return true;
    } else {
      return false;
    }
   }
}
