import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Modal } from '../../../node_modules/ngx-modialog/plugins/bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  loggedUser = JSON.parse(sessionStorage.getItem('user'));
  isValid = true;

  constructor(private userService: UserService, private router: Router, private modal: Modal) { }

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

  forgotPasswordModal() {
    let string;
    const dialogRef = this.modal.prompt()
        .size('lg')
        .isBlocking(true)
        .showClose(false)
        .keyboard(27)
        .title('Password Recovery')
        .body('Enter account email below')
        .open();
    dialogRef.result
      .then(result => {
        this.user.email = result;
        this.userService.forgotPassword(this.user).subscribe(response => {
            this.modal.confirm()
            .size('lg')
            .isBlocking(true)
            .showClose(false)
            .keyboard(27)
            .title('Recovery Result')
            .body('Email sent to ' + result)
            .open();
        });
      });
  }

}
