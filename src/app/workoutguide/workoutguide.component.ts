import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../services/workout.service';
import { Router } from '../../../node_modules/@angular/router';
import { Workout } from '../models/workout';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-workoutguide',
  templateUrl: './workoutguide.component.html',
  styleUrls: ['./workoutguide.component.css']
})
export class WorkoutguideComponent implements OnInit {

  sessionWorkout = sessionStorage.getItem('workout');
  currentExercise: String;
  setDuration: number;
  setRest: number;
  nextExercise: String;
  exerciseList = [];
  
  public showExercise:boolean = false;
  public showRest:boolean = false;

  //set the session workout to a workout object
  workout: Workout = JSON.parse(this.sessionWorkout);

  constructor(private exerciseService: ExerciseService, private router : Router) { }

  ngOnInit() {
    this.createExerciseArray();
    this.runWorkout();
  }

  endWorkout(){
    this.router.navigate(['dashboard']);
  }

  //need to get all exercises for workout with backend and put in an exercises array to use for the workout;
  createExerciseArray(){
    this.exerciseService.getExercisesByWorkoutId(this.workout.workout_id).subscribe(exercises => {
      this.exerciseList = JSON.parse(<any>exercises);
    });
  }

  runWorkout(){
    let runningDuration = 1000;

    //run the workout
    for (let i = 0; i < this.exerciseList.length; i++){

        //If it's the first set of the entire exercise then start immediately (after 1 second).
        if(i == 0){
            setTimeout(function(){

                //display the current exercise's name, duration, next exercise and rest period on the page with property binding
                //change the current exercise displayed
                this.currentExercise = this.exerciseList[i].name;
                console.log(this.exerciseList[i].name);
                //change the set duration displayed
                this.setDuration = this.exerciseList[i].duration;
                console.log("exercise duration: " + this.exerciseList[i].duration);
                //change the next exercise displayed
                this.nextExercise = this.exerciseList[i+1].name;
                console.log("next exercise: " + this.exerciseList[i+1].name);

                //show exercise details
                this.showExercise = true;
                console.log("hide rest period...");
                //hide rest period
                this.showRest = false;
                
                setTimeout(function(){                  
                  //change the rest period displayed
                  this.setRest = this.exerciseList[i].rest;
                  console.log("rest period after exercise: " + this.exerciseList[i].rest); 

                  //hide name, duration and next exercise, show rest period
                  console.log('hide name...');
                  console.log('hide duration...');
                  console.log('hide next exercise...')
                  //hide exercise details
                  this.showExercise = false;
                  //show rest period
                  this.showRest = true;

              }, this.exercisesList[i].duration);  

            }, 1000);

        //else every other set in the workout
        }else{

            runningDuration += (this.exerciseList[i-1].duration + this.exerciseList[i-1].rest);

            setTimeout(function(){  

                //display the current exercise's name, duration, next exercise and rest period on the page with property binding
                //current exercise
                this.currentExercise = this.exerciseList[i].name;
                console.log(this.exerciseList[i].name);
                //set duration
                this.setDuration = this.exerciseList[i].duration;
                console.log("exercise duration: " + this.exerciseList[i].duration);
                //next exercise
                this.nextExercise = this.exerciseList[i+1].name;
                console.log("next exercise: " + this.exerciseList[i+1].name);
                
                //show exercise details
                this.showExercise = true;
                console.log("hide rest period...");
                //hide rest period
                this.showRest = false;

                setTimeout(function(){

                  //change the rest period displayed
                  this.setRest = this.exerciseList[i].rest;
                  console.log("rest period after exercise: " + this.exerciseList[i].rest); 

                  //hide name, duration and next exercise, show rest period
                  console.log('hide name...');
                  console.log('hide duration...');
                  console.log('hide next exercise...')
                  //hide exercise details
                  this.showExercise = false;
                  //show rest period
                  this.showRest = true;

              }, this.exercisesList[i].duration);

            }, runningDuration); //the timer should equal a running total of the previous iterations duration plus rest, so it waits that long until displaying the next set.  
        }
    }
  }

}
