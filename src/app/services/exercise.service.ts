import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { Workout } from '../models/workout';
import { Observable, BehaviorSubject } from '../../../node_modules/rxjs';
import { environment } from '../../environments/environment';
import { Exercise } from '../models/exercise';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ExerciseService {

  //subscribers: BehaviorSubject<Exercise> = new BehaviorSubject<Exercise>(null);

  constructor(private http: HttpClient) { 
    const user = JSON.parse(localStorage.getItem('user'));
    const workout = JSON.parse(localStorage.getItem('workout'));
  }

  public getExercisesByWorkoutId(workout_id: number): Observable<Workout> {
    console.log(`Attempting to retrieve exercises by workout: ${workout_id}`);
    return this.http.get<Workout>(environment.apiUrl + `exercises/${workout_id}`, HTTP_OPTIONS);
  }

  public createExercise(exercise: Exercise): Observable<Exercise> {
    console.log(`Attempting to create exercise: ${exercise.exercise_id}`);
    let json = JSON.stringify(exercise);
    return this.http.post<Exercise>(environment.apiUrl + 'exercises/create', json, HTTP_OPTIONS);
  }

  public getAllExercises(): Observable<Workout> {
    console.log('Attempting to retrieve all exercises');
    return this.http.get<Workout>(environment.apiUrl + 'workouts');
  }

}
