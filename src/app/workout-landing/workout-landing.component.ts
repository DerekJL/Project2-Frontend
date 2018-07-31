import { Component, OnInit } from '@angular/core';
import { Workout } from '../models/workout';
import { Router } from '../../../node_modules/@angular/router';
import { WorkoutService } from '../services/workout.service';
import { User } from '../models/user';
import { Modal } from '../../../node_modules/ngx-modialog/plugins/bootstrap';

@Component({
  selector: 'app-workout-landing',
  templateUrl: './workout-landing.component.html',
  styleUrls: ['./workout-landing.component.css']
})
export class WorkoutLandingComponent implements OnInit {

  workouts: Workout[];
  workout1: Workout = new Workout (1, 1, 1, 1, 'push-ups');
  loggedUser: User = JSON.parse(localStorage.getItem('user'));
  constructor(private router: Router, private workoutService: WorkoutService, public modal: Modal) { }

  ngOnInit() {
    // this.workoutService.getWorkoutByUserId(this.loggedUser.user_id).subscribe(response => {
    //   this.workouts = JSON.parse(<any>response);
    // });
    this.workouts = [this.workout1];
  }

  startWorkout(workout: Workout) {
    this.workoutService.startWorkout(workout);
  }

  openModal(workout: Workout) {
    this.modal.alert()
    .size('lg')
    .isBlocking(true)
    .showClose(true)
    .keyboard(27)
    .title(workout.workout_name)
    .body('A Customized Modal')
    .open();
  }

}
