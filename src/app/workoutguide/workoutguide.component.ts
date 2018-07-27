import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../services/workout.service';
import { Router } from '../../../node_modules/@angular/router';
import { Workout } from '../models/workout';

@Component({
  selector: 'app-workoutguide',
  templateUrl: './workoutguide.component.html',
  styleUrls: ['./workoutguide.component.css']
})
export class WorkoutguideComponent implements OnInit {

  loggedWorkout = localStorage.getItem('workout');
  currentExercise: String;
  setDuration: number;
  setRest: number;
  nextExercise: String;
  exercises = [];
  
  constructor(private workoutService: WorkoutService, private router : Router) { }

  ngOnInit() {
  }


    //need to get all exercises for workout with backend and put in an exercises array;
    

}
