import { Component, OnInit, NgModule } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Workout } from '../models/workout';
import { UserService } from '../services/user.service';
import { WorkoutService } from '../services/workout.service';
import { Exercise } from '../models/exercise';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;
  workout1: Workout = new Workout (1, 1, 1, 1, 'push-ups');
  workouts: Workout[] = [this.workout1];
  exercise1: Exercise = new Exercise (1, 'pushup', 1, 'pushup', 1, 1, 1, 1, 1);
  exercises: Exercise[];
  loggedUser = JSON.parse(localStorage.getItem('user'));

  constructor(private router: Router, private workoutService: WorkoutService) { }

  ngOnInit() {
    // if (this.loggedUser === null) {
    //   this.router.navigate(['login']);
    // } else {
    //   this.user = this.loggedUser;
    //   this.workoutService.getWorkoutByUserId(this.user.user_id).subscribe(obsworkouts => {
    //     this.workouts.push(obsworkouts);
    //   });
    // }
  }

}
