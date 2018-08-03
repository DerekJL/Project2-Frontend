import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  subscribers: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  /*
    If a user JSON string already exists in the sessionStorage, take the user out,
    parse it into an object, then put the user into a BehaviorSubject object
  */
  constructor(private http: HttpClient) {
    const u = sessionStorage.getItem('user');
    if (u !== '{}' && u !== undefined) {
      this.subscribers.next(JSON.parse(u));
    }
  }

  /*
    The loginUser() method returns an Observable<User>. A user will be returned from the
    server asynchronously, so subscribing to this observable makes it possible to perform
    a function once a value is received.
  */
 public loginUser(user: User) {
   console.log(`Attempting to login user: ${user.username}`);
   let json = JSON.stringify(user);
   return this.http.post<User>(environment.apiUrl + 'users/login', json, HTTP_OPTIONS);
 }

 public registerUser(user: User): Observable<User> {
   console.log(`Attempting to register user : ${user.username}`);
   const json = JSON.stringify(user);
  //  const emailAvailable = this.isEmailAvailable(user.email);
  //  const usernameAvailable = this.isUsernameAvailable(user.username);
  return this.http.post<User>(environment.apiUrl + 'users/register', json, HTTP_OPTIONS);
 }

 public isEmailAvailable(user: User): Observable<User> {
   const json = JSON.stringify(user);
   return this.http.post<User>(environment.apiUrl + 'users/emails', json, HTTP_OPTIONS);
 }

 public isUsernameAvailable(user: User): Observable<User> {
   const json = JSON.stringify(user);
   return this.http.post<User>(environment.apiUrl + 'users/usernames', json, HTTP_OPTIONS);
 }

 public getUserByUsername(user: User): Observable<User> {
   let json = JSON.stringify(user);
   return this.http.post<User>(environment.apiUrl + 'users/usernames', json, HTTP_OPTIONS);
 }
}

