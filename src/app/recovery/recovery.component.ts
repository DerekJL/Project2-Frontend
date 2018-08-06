import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

  newPassword: string;
  confirmPassword: string;
  passwordMatch = true;
  passwordLength = true;
  user: User = new User();
  passwordSuccess = false;
  email: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  updatePassword() {
    if (this.newPassword.length < 8) {
      this.passwordLength = false;
    } else if (this.confirmPassword === this.newPassword) {
      this.user.email = this.email;
      this.userService.getUserByEmail(this.user).subscribe(response => {
        if (response !== null && response.email !== null) {
          this.user.password = this.newPassword;
          this.userService.updateUser(this.user).subscribe(response1 => {
            if (response1 !== null) {
              this.user = response;
              setTimeout(() => {
                this.passwordSuccess = true;
              }, 3000);
              this.router.navigate(['dashboard']);
            }
          });
        }
      });
    } else {
      this.passwordMatch = false;
    }
  }

  cancel() {
    this.passwordLength = true;
    this.passwordMatch = true;
  }

}
