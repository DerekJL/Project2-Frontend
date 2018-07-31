import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { Exercise } from '../models/exercise';
import { environment } from '../../environments/environment';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient) {
    let user = JSON.parse(localStorage.getItem('user'));
  }

  createExercise(exercise: Exercise) {
    let json = JSON.stringify(exercise);
    return this.http.post<Exercise>(environment.apiUrl + 'exercises', json, HTTP_OPTIONS);
  }

  getAllExercisesByUserId(id: number) {
    return this.http.get<Exercise>(environment.apiUrl + `exercises/${id}`, HTTP_OPTIONS);
  }

  getAllExercises() {
    return this.http.get<Exercise>(environment.apiUrl + 'exercises', HTTP_OPTIONS);
  }
}
