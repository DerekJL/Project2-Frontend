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

  constructor(private workoutService: WorkoutService, private exerciseService: ExerciseService, private router: Router, public modal: Modal) { }

  ngOnInit() {

    this.getWorkoutList();
    this.getExerciseList();

  }

  getWorkoutList(){
    this.workoutService.getAllWorkouts().subscribe(workouts => {
      this.workoutList = JSON.parse(<any>workouts);
      console.log(this.workoutList);
    })
  }

  getExerciseList(){
    this.exerciseService.getAllExercises().subscribe(exercises => {
      this.exerciseList = JSON.parse(<any>exercises);
      console.log(this.exerciseList);
    })
  }

  startWorkout(workout: Workout) {
    this.workoutService.startWorkout(workout);
  }

  openWorkoutModal(workout: Workout) {
    this.getExercises(workout.workout_id);
    let numExercises = '<li>' + this.exerciseList.length + '</li>';
    this.modal .alert()
    .size('lg')
    .isBlocking(true)
    .showClose(false)
    .keyboard(27)
    .title(workout.workout_name)
    .body('<ul>' + numExercises + this.listExercises() + '</ul>')
    .open();
  }

  openExerciseModal(exercise: Exercise) {
    this.modal .alert()
    .size('lg')
    .isBlocking(true)
    .showClose(false)
    .keyboard(27)
    .title(exercise.exercise_name)
    .body('<ul><li>Sets: '+exercise.exercise_sets+'</li><li>Reps: '+exercise.exercise_reps+'</li><li>Duration: '+exercise.exercise_duration+'</li></ul>')
    .open();
  }

  getExercises(id: number) {
    this.exerciseService.getExercisesByWorkoutId(id).subscribe(response => {
      this.exerciseList = JSON.parse(<any>response);
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
    for (let exercise of this.exerciseList) {
      returnString.concat('<li>' + exercise.exercise_name + '</li>');
    }
    return returnString;
  }

}
