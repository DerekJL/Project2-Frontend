import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  loggedUser = localStorage.getItem('user');

  loggedIn() {
    if (this.loggedUser === null) {
      return false;
    } else {
      return true;
    }
  }
}
