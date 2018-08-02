import { Component, OnInit, NgModule } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Workout } from '../models/workout';
import { UserService } from '../services/user.service';
import { WorkoutService } from '../services/workout.service';
import { Exercise } from '../models/exercise';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;
  // workout1: Workout = new Workout (1, 1, 1, 1, 'push-ups');
  workouts: Workout[] = [];
  // exercise1: Exercise = new Exercise (1, 'pushup', 1, 'pushup', 1, 1, 1, 1, 1);
  exercises: Exercise[] = [];
  numWorkouts: number;
  numExercises: number;
  loggedUser: User = JSON.parse(sessionStorage.getItem('user'));

  constructor(private router: Router, private workoutService: WorkoutService, private exerciseService: ExerciseService) { }

  ngOnInit() {
    if (this.loggedUser === null) {
      this.router.navigate(['login']);
    } else {
      this.user = this.loggedUser;
      this.workoutService.getWorkoutsByUserId(this.user.user_id).subscribe(response => {
        this.workouts = response;
      });
      this.exerciseService.getExercisesByUserId(this.user.user_id).subscribe(response => {
        this.exercises = response;
      });
      this.numWorkouts = (this.workouts === undefined) ? 0 : this.workouts.length;
      this.numExercises = (this.exercises === undefined) ? 0 : this.exercises.length;
    }
  }

}
