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
      console.log(this.email);
      this.user.email = this.email;
      this.userService.getUserByEmail(this.user).subscribe(response => {
        console.log(response);
        if (response !== null && response.email !== null) {
          this.user = response;
          this.user.password = this.newPassword;
          
          this.userService.updateUser(this.user).subscribe(response1 => {
            console.log(response1);
            if (response1 !== null) {
              this.user = response;
              this.passwordSuccess = true;

              setTimeout(()=> {
                this.router.navigate(['dashboard']);
              },3000)
              
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
