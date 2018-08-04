import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { Workout } from '../models/workout';
import { Observable, BehaviorSubject } from '../../../node_modules/rxjs';
import { environment } from '../../environments/environment';
import { Exercise } from '../models/exercise';
import { WorkoutExercise } from '../models/workoutexercise';

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
    const user = JSON.parse(sessionStorage.getItem('user'));
    const workout = JSON.parse(sessionStorage.getItem('workout'));
  }

  public getExercisesByWorkoutId(workout_id: number): Observable<WorkoutExercise[]> {
    console.log(`Attempting to retrieve exercises by workout: ${workout_id}`);
    return this.http.get<WorkoutExercise[]>(environment.apiUrl + `exercises/workouts/${workout_id}`, HTTP_OPTIONS);
  }

  public createExercise(exercise: Exercise): Observable<Exercise> {
    console.log(`Attempting to create exercise`);
    let json = JSON.stringify(exercise);
    return this.http.post<Exercise>(environment.apiUrl + 'exercises/create', json, HTTP_OPTIONS);
  }

  public getExercisesByUserId(user_id: number): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(environment.apiUrl + `exercises/users/${user_id}`, HTTP_OPTIONS);
  }
  public getAllExercises(): Observable<Exercise[]> {
    console.log('Attempting to retrieve all exercises');
    return this.http.get<Exercise[]>(environment.apiUrl + 'exercises');
  }

  public getExerciseById(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(environment.apiUrl + `exercises/${id}`);
  }

}
