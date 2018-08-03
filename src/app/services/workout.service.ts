import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Workout } from '../models/workout';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '../../../node_modules/@angular/router';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private http: HttpClient, private router: Router) {
    const user = JSON.parse(sessionStorage.getItem('user'));
  }

  public createWorkout(workout: Workout): Observable<Workout> {
    console.log(`Attempting to create workout`) //${workout.workout_id}`);
    let json = JSON.stringify(workout);
    return this.http.post<Workout>(environment.apiUrl + 'workouts/create', json, HTTP_OPTIONS);
  }

  public getWorkoutsByUserId(user_id: number): Observable<Workout[]> {
    console.log(`Attempting to retrieve workouts by user: ${user_id}`);
    return this.http.get<Workout[]>(environment.apiUrl + `workouts/users/${user_id}`, HTTP_OPTIONS);
  }

  public getAllWorkouts(): Observable<Workout[]> {
    console.log('Attempting to retrieve all workouts');
    return this.http.get<Workout[]>(environment.apiUrl + 'workouts');
  }

  
}
