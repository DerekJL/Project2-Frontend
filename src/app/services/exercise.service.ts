import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';


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

  //function not done
  // public getExercisesByWorkout(workout: Workout): Observable<Workout> {
  //   console.log(`Attempting to create workout: ${workout.workout_id}`);
  //   let json = JSON.stringify(workout);
  //   return this.http.post<Workout>(environment.apiUrl + 'workouts', json, HTTP_OPTIONS);
  // }
}
