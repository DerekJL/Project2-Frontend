import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Router } from '../../../node_modules/@angular/router';
import { HttpHeaders } from '../../../node_modules/@angular/common/http';
import { UserExercise } from '../models/userexercise';
import { Observable } from '../../../node_modules/rxjs';
import { environment } from '../../environments/environment.prod';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UserexerciseService {

  constructor(private http: HttpClient, private router: Router) { }

  public textUserExercise(userExercise: UserExercise): Observable<UserExercise> {
    console.log(`Attempting to send userExercise for text`);
    let json = JSON.stringify(userExercise);
    return this.http.post<UserExercise>(environment.apiUrl + 'user-exercises', json, HTTP_OPTIONS);
  }
}
