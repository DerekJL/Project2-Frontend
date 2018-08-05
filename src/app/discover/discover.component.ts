import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { WorkoutService } from '../services/workout.service';
import { ExerciseService } from '../services/exercise.service';
import { Workout } from '../models/workout';
import { Exercise } from '../models/exercise';
import { Modal } from '../../../node_modules/ngx-modialog/plugins/bootstrap';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {

  workoutList: Workout[];
  exerciseList: Exercise[];
  workoutExercises: Exercise[];
  testExercises: Exercise[];
  isCollapsed1 = false;
  isCollapsed2 = false;

  constructor(private workoutService: WorkoutService, private exerciseService: ExerciseService,
    private router: Router, public modal: Modal) { }

  ngOnInit() {

    this.getWorkoutList();
    this.getExerciseList();
  }

  getWorkoutList() {
    this.workoutService.getAllWorkouts().subscribe(workouts => {
      this.workoutList = workouts;
      // console.log(this.workoutList);
    });
  }

  getExerciseList() {
    this.exerciseService.getAllExercises().subscribe(exercises => {
      this.exerciseList = exercises;
      // console.log(this.exerciseList);
    });
  }

  startWorkout(workout: Workout) {
    // set workout to session storage
    let workoutString = JSON.stringify(workout);
    sessionStorage.setItem('workout', workoutString);
    // can also change workout flag if have time to implement backend text based workout
    this.router.navigate(['workoutguide']);
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

  getWorkoutExercises(id: number) {
    this.exerciseService.getExercisesByWorkoutId(id).subscribe(response => {
      this.testExercises = this.workoutExercises = response;
      console.log(this.testExercises);
    });
  }

  listExercises() {
    let returnString: string;
    for (let exercise of this.workoutExercises) {
      returnString.concat('<li>' + exercise.exercise_name + '</li>');
    }
    return returnString;
  }
}
