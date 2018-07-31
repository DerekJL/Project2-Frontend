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

  openModal(workout: Workout) {
    this.modal .alert()
    .size('lg')
    .isBlocking(true)
    .showClose(true)
    .keyboard(27)
    .title(workout.workout_name)
    .body('A Customized Modal')
    .open();
  }


}
