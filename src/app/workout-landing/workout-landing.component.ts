import { Component, OnInit } from '@angular/core';
import { Workout } from '../models/workout';
import { Router } from '../../../node_modules/@angular/router';
import { WorkoutService } from '../services/workout.service';
import { User } from '../models/user';
import { Modal } from '../../../node_modules/ngx-modialog/plugins/bootstrap';
import { Exercise } from '../models/exercise';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-workout-landing',
  templateUrl: './workout-landing.component.html',
  styleUrls: ['./workout-landing.component.css']
})
export class WorkoutLandingComponent implements OnInit {

  workouts: Workout[];
  exercises: Exercise[];
  // workout1: Workout = new Workout (1, 1, 1, 1, 'push-ups');
  workout: Workout = new Workout();
  loggedUser: User = JSON.parse(sessionStorage.getItem('user'));
  constructor(private router: Router, private workoutService: WorkoutService, public modal: Modal,
    private exerciseService: ExerciseService) { }

  ngOnInit() {
    if (this.loggedUser !== null || this.loggedUser !== undefined) {
      this.workoutService.getWorkoutsByUserId(this.loggedUser.user_id).subscribe(response => {
        this.workouts = response;
      });
    }
  }

  startWorkout(workout: Workout) {
    // set workout to session storage
    let workoutString = JSON.stringify(workout);
    sessionStorage.setItem('workout', workoutString);
    // can also change workout flag if have time to implement backend text based workout
    this.router.navigate(['workoutguide']);
  }

  getExercises(id: number) {
    this.exerciseService.getExercisesByWorkoutId(id).subscribe(response => {
      this.exercises = JSON.parse(<any>response);
    });
  }

  getNumberOfExercises(id: number) {
    let exercisesForWorkout: Exercise[];
    this.exerciseService.getExercisesByWorkoutId(id).subscribe(response => {
      exercisesForWorkout = JSON.parse(<any>response);
    });
    return exercisesForWorkout.length;
  }

  listExercises() {
    let returnString: string;
    for (let exercise of this.exercises) {
      returnString.concat('<li>' + exercise.exercise_name + '</li>');
    }
    return returnString;
  }

  openModal(workout: Workout) {
    this.getExercises(workout.workout_id);
    let numExercises = '<li>' + this.exercises.length + '</li>';
    this.modal.alert()
    .size('lg')
    .isBlocking(true)
    .showClose(false)
    .keyboard(27)
    .title(workout.workout_name)
    .body('<ul>' + numExercises + this.listExercises() + '</ul>')
    .open();
  }

}
