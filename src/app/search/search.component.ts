import { Component, OnInit } from '@angular/core';
import { Exercise } from '../models/exercise';
import { WorkoutExercise } from '../models/workoutexercise';
import { ExerciseService } from '../services/exercise.service';
import { WorkoutService } from '../services/workout.service';
import { Workout } from '../models/workout';
import { Modal } from '../../../node_modules/ngx-modialog/plugins/bootstrap';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchVal = '';
  exercises: Exercise[] = [];
  workouts: Workout[] = [];
  searchResults = [];

  constructor(private exerciseService: ExerciseService, private workoutService: WorkoutService,
    private modal: Modal, private router: Router) { }

  ngOnInit() {
    this.searchVal = (sessionStorage.getItem('search'));
    this.getExercises();
    this.getWorkouts();
  }

  getExercises() {
    this.exerciseService.getAllExercises().subscribe(response => {
      for (let i = 0; i < response.length; i++) {
        if (response[i].exercise_name.toLowerCase().includes(this.searchVal.toLowerCase())) {
          this.exercises.push(response[i]);
        }
      }
    });
  }

  getWorkouts() {
    this.workoutService.getAllWorkouts().subscribe(response => {
      for (let i = 0; i < response.length; i++) {
        if (response[i].workout_name.toLowerCase().includes(this.searchVal.toLowerCase())) {
          this.workouts.push(response[i]);
        }
      }
    });
  }

  openExerciseModal(exercise: Exercise) {
    let exerciseDescription = '<li> Description: ' + exercise.exercise_description + '</li>';
    let exerciseSets = '<li> Sets: ' + exercise.exercise_sets + '</li>';
    let exerciseReps = '<li> Reps: ' + exercise.exercise_reps + '</li>';
    let exerciseDur = '<li> Duration: ' + exercise.exercise_duration + '</li>';
    let exerciseRest = '<li> Rest Between Sets: ' + exercise.exercise_rest + '</li>';
    if (exercise.exercise_rest === null) {
      exerciseRest = '<li> Rest Between Sets: none</li>';
    }
    let modalBody = exerciseDescription + exerciseSets + exerciseReps + exerciseDur + exerciseRest;
    this.modal.alert()
      .size('lg')
      .isBlocking(true)
      .showClose(false)
      .keyboard(27)
      .title(exercise.exercise_name.toUpperCase())
      .body('<ul>' + modalBody + '</ul>')
      .open();
  }

  openWorkoutModal(workout: Workout) {
    this.exerciseService.getExercisesByWorkoutId(workout.workout_id).subscribe(response => {
      let exerciseList = '';
      let returnExercises = response;
      for (let i = 0; i < returnExercises.length; i++) {
        exerciseList = exerciseList.concat('<li> Exercise: ' + returnExercises[i].exercise_name + '</li>');
      }
      let workoutDescription = '<li> Description: ' + workout.workout_description + '</li>';
      this.modal.alert()
        .size('lg')
        .isBlocking(true)
        .showClose(false)
        .keyboard(27)
        .title(workout.workout_name.toUpperCase())
        .body('<ul>' + workoutDescription + exerciseList + '</ul>')
        .open();
    });
  }
  startWorkout(workout: Workout) {
    // set workout to session storage
    let workoutString = JSON.stringify(workout);
    sessionStorage.setItem('workout', workoutString);
    // can also change workout flag if have time to implement backend text based workout
    this.router.navigate(['workoutguide']);
  }

}
