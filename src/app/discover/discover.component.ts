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

  constructor(private workoutService: WorkoutService, private exerciseService: ExerciseService, private router: Router, public modal: Modal) { }

  ngOnInit() {

    this.getWorkoutList();
    this.getExerciseList();

  }

  getWorkoutList(){
    this.workoutService.getAllWorkouts().subscribe(workouts => {
      this.workoutList = workouts;
      console.log(this.workoutList);
    })
  }

  getExerciseList(){
    this.exerciseService.getAllExercises().subscribe(exercises => {
      this.exerciseList = exercises;
      console.log(this.exerciseList);
    })
  }

  startWorkout(workout: Workout) {
    //set workout to session storage
    let workoutString = JSON.stringify(workout);
    sessionStorage.setItem('workout', workoutString);
    //can also change workout flag if have time to implement backend text based workout
    this.router.navigate(['workoutguide']);
  }

  openWorkoutModal(workout: Workout) {
    this.getWorkoutExercises(workout.workout_id);
    let numExercises = '<li>' + this.workoutExercises.length + '</li>';
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
    .body('<ul><li>Sets: '+exercise.exercise_sets+'</li><li>Reps: '+exercise.exercise_reps+'</li><li>Duration: '+exercise.exercise_duration+' seconds</li><li>Rest: '+exercise.exercise_rest+' seconds</li></ul>')
    .open();
  }

  getWorkoutExercises(id: number) {
    this.exerciseService.getExercisesByWorkoutId(id).subscribe(response => {
      this.workoutExercises = response;
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
