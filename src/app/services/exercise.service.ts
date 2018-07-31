import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { Workout } from '../models/workout';
import { Observable } from '../../../node_modules/rxjs';
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
    const user = JSON.parse(localStorage.getItem('user'));
    const workout = JSON.parse(localStorage.getItem('workout'));
  }

  public getExercisesByWorkoutId(workout_id: number): Observable<Workout> {
    console.log(`Attempting to retrieve exercises by workout: ${workout_id}`);
    return this.http.get<Workout>(environment.apiUrl + `exercises/${workout_id}`, HTTP_OPTIONS);
  }
}
