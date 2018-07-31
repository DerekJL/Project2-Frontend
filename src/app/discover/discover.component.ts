import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { WorkoutService } from '../services/workout.service';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {

  workoutList = [];
  exerciseList = [];

  constructor(private workoutService: WorkoutService, private exerciseService: ExerciseService, private router: Router) { }

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

}
