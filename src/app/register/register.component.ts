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
  loggedUser = JSON.parse(sessionStorage.getItem('user'));
  isValidEmail = true;
  isValidUsername = true;
  isValidFirstName = true;
  isValidLastName = true;
  isValidPhoneNumber = true;
  isValidPassword = true;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (this.loggedUser !== null && this.loggedUser !== undefined) {
      this.router.navigate(['dashboard']);
    }
  }

  validEmail() {
    // console.log('in validEmail()');
    this.isValidEmail = true;
    this.userService.isEmailAvailable(this.user).subscribe(users => {
      // console.log('received respose from call to getUsersByEmail()');
      // console.log('user email: ' +this.user.email);
      // console.log('users object returned from database: ' + users.email);
      if (users.email !== null) {
        this.isValidEmail = false;
      } else if (!this.validateEmail(this.user.email)) {
        this.isValidEmail = false;
      }
      if (this.isValidEmail !== false) {
        this.isValidEmail = true;
      }
    });


  }

  validateEmail(email: string): boolean {
    const regularExpression = /^([a-zA-Z0-9_\.\-+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    // console.log(email);
    if (email !== null && email !== undefined) {
      return regularExpression.test(email);
    } else {
      return false;
    }
  }

  validUsername() {
    this.isValidUsername = true;
    this.userService.isUsernameAvailable(this.user).subscribe(users => {
      if (users.username !== null) {
        this.isValidUsername = false;
      } else if (this.validateUsername(this.user.username) === false) {
        this.isValidUsername = false;
      }
      if (this.isValidUsername !== false) {
        this.isValidUsername = true;
      }
    });

  }

  validateUsername(username: string): boolean {
    // console.log('username: ' + username);
    if (username !== null && username !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  register() {
    if (this.isValidEmail && this.isValidUsername && this.validFields()) {
      // Disable register button
      this.userService.registerUser(this.user).subscribe((users) => {
        if (users === null) {
          // Why would a user return null here?
        } else {
          sessionStorage.setItem('user', JSON.stringify(users));
          // console.log(sessionStorage.getItem('user'));
          this.router.navigate(['login']);
        }
      });
    } else {
      // // Something to go here
      // console.log('entered the empty else statement in register() because an input was not valid');
      // console.log('valid email: ' + this.isValidEmail);
      // console.log('valid username: ' + this.isValidUsername);
      // console.log('valid fields: ' + this.validFields());
    }
  }

  validFields(): boolean {
    let returningBool = true;
    if (this.user.firstName.length < 2) {
      this.isValidFirstName = false;
      returningBool = false;
    } else {
      this.isValidFirstName = true;
    }
    if (!this.phonenumber(this.user.phone)) {
      this.isValidPhoneNumber = false;
      returningBool = false;
    } else {
      this.isValidPhoneNumber = true;
    }
    if (this.user.lastName.length < 2) {
      this.isValidLastName = false;
      returningBool = false;
    } else {
      this.isValidLastName = true;
    }
    if (this.user.password.length < 8) {
      this.isValidPassword = false;
      returningBool = false;
    } else {
      this.isValidPassword = true;
    }
    return returningBool;
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
