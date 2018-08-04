import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '../../../node_modules/@angular/router';
import { Modal } from '../../../node_modules/ngx-modialog/plugins/bootstrap';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = new User();
  loggedUser: User = JSON.parse(sessionStorage.getItem('user'));
  doChangePassword = false;
  currentPassword: string;
  confirmPassword: string;
  newPassword: string;
  passwordMatch = true;
  constructor(private router: Router, private modal: Modal, private userService: UserService) { }

  ngOnInit() {
    if (this.loggedUser === null) {
      this.router.navigate(['login']);
    } else {
      this.user = this.loggedUser;
    }
  }

  updatePassword() {
    console.log('in updatePassword');
    console.log('new password: '  + this.newPassword);
    console.log('confirm password: ' + this.confirmPassword);
    if (this.confirmPassword === this.newPassword) {
      this.user.password = this.newPassword;
      this.userService.updateUser(this.user).subscribe(response => {
        if (response !== null) {
          this.user = response;
          sessionStorage.setItem('user', JSON.stringify(this.user));
        }
      });
    } else {
      this.passwordMatch = false;
    }
  }

  changePassword() {
    console.log('in changePassword()');
    this.doChangePassword = true;
  }

}
