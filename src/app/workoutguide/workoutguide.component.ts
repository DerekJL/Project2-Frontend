import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../services/workout.service';
import { Router } from '../../../node_modules/@angular/router';
import { Workout } from '../models/workout';
import { ExerciseService } from '../services/exercise.service';
import { WorkoutExercise } from '../models/workoutexercise';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { UserExercise } from '../models/userexercise';
import { UserexerciseService } from '../services/userexercise.service';

@Component({
  selector: 'app-workoutguide',
  templateUrl: './workoutguide.component.html',
  styleUrls: ['./workoutguide.component.css']
})
export class WorkoutguideComponent implements OnInit {

  time = {hour: 12, minute: 0};
  model: NgbDateStruct;
  date: {year: number, month: number}; 
  sessionWorkout = sessionStorage.getItem('workout');
  
  currentExercise: String;
  setDuration: number;
  setRest: number;
  nextExercise: String;
  exerciseList: WorkoutExercise[]= [];
  
  public showExercise:boolean = false;
  public showRest:boolean = false;
  public showBeginButton:boolean = true;
  public showEndButton:boolean = false;
  public showCheckbox:boolean = true;
  public showTimePicker:boolean = false;
  public showDatePicker:boolean = false;
  public showWaitingMessage:boolean = false;

  textEnabled:boolean = false;

  userDate: Date;

  //set the session workout to a workout object
  workout: Workout = JSON.parse(this.sessionWorkout);
  
  constructor(private exerciseService: ExerciseService, private userExerciseService: UserexerciseService, private router : Router) { }

  ngOnInit() {
    this.createExerciseArray();

  }

  endWorkout(){
    this.router.navigate(['dashboard']);
  }

  //need to get all exercises for workout with backend and put in an exercises array to use for the workout;
  createExerciseArray(){
    this.exerciseService.getExercisesByWorkoutId(this.workout.workout_id).subscribe(exercises => {
      this.exerciseList = exercises;
      console.log(exercises);
    });
  }

  checkboxClicked(){

    //shows or hides the time and date picker
    this.showTimePicker = !this.showTimePicker;
    this.showDatePicker = !this.showDatePicker;
    //enables or disables texting
    this.textEnabled = !this.textEnabled;
  }

  beginWorkout(){

    //hide/show elements when start button is clicked
    this.showBeginButton = false;
    this.showCheckbox = false;
    this.showDatePicker = false;
    this.showTimePicker = false;
    this.showEndButton = true;

    //check the session storage to see if texting is enabled or disabled
    if(this.textEnabled){
      //if texting is enabled then call the runWorkout() function in a setTimeout, the timeout should be the timestamp the user set MINUS the current timestamp (in miliseconds).
      console.log(this.model.year);
      console.log(this.model.month);
      console.log(this.model.day);
      console.log(this.time.hour);
      console.log(this.time.minute);

      let userDateTime = new Date(this.model.year, (this.model.month-1), this.model.day, this.time.hour, this.time.minute);
      this.userDate = userDateTime;
      this.showWaitingMessage = true;

      console.log(userDateTime);
      console.log(userDateTime.getTime());

      let currentDateTime = new Date();
      console.log('current: ' +currentDateTime);
      console.log(currentDateTime.getTime());

      let waitTime = userDateTime.getTime() - currentDateTime.getTime();
      console.log(waitTime);

      setTimeout(this.runWorkout.bind(this), waitTime);
    }else{
      //if texting is not enabled then start the workout
      this.runWorkout();
    }
    //^^^^
    //create a users timestamp by getting the date from a datepicker and a time from the timepicker.
  }

  runWorkout(){

    this.showWaitingMessage = false;

    let runningDuration = 1000;
    let exerciseList = this.exerciseList;
    console.log(exerciseList.length);
    //run the workout
    console.log('exercise list length: '+ exerciseList.length);
    for (let i = 0; i < exerciseList.length; i++){

        //create a UserExercise object to send to the backend controller for texting      
        let sessionUser = sessionStorage.getItem('user');
        let user = JSON.parse(sessionUser);

        let userExercise = new UserExercise();
        userExercise.exercise_description = exerciseList[i].exercise_description;
        userExercise.exercise_duration = exerciseList[i].exercise_duration;
        userExercise.exercise_id = exerciseList[i].exercise_id;
        userExercise.exercise_name = exerciseList[i].exercise_name;
        userExercise.exercise_reps = exerciseList[i].exercise_reps;
        userExercise.exercise_rest = exerciseList[i].exercise_rest;
        userExercise.exercise_sets = exerciseList[i].exercise_sets;
        userExercise.type_id = exerciseList[i].type_id;
        userExercise.user_id = exerciseList[i].user_id;
        userExercise.userPhone = user.phone;

        //adjust the duration and rest variables
        exerciseList[i].exercise_duration *= 1000;
        exerciseList[i].exercise_rest *= 1000;
        
        //If it's the first set of the entire exercise then start immediately (after 1 second).
        if(i == 0){
            setTimeout(() => {
                //display the current exercise's name, duration, next exercise and rest period on the page with property binding
                
                //send the userExercises object to the backend to text out the current exercise
                this.userExerciseService.textUserExercise(userExercise).subscribe((response) => {
                  if (response) {
                    console.log('text successful');
                  } else {
                    console.log('text unsuccessful');
                  }
                });

                //show exercise details
                this.showExercise = true;
                //hide rest period
                this.showRest = false;

                //current exercise
                this.currentExercise = exerciseList[i].exercise_name;
                //set duration
                this.setDuration = exerciseList[i].exercise_duration;        
                //next exercise (if not the end of the array)
                if((i + 2) > exerciseList.length){
                  this.nextExercise = 'None';
                }else{
                this.nextExercise = exerciseList[i+1].exercise_name;
                }
  
                setTimeout(() => {
                  
                  //send the userExercise object to the backend to text out the rest period and next exercise
                  this.userExerciseService.textUserExercise(userExercise).subscribe((response) => {
                    if (response) {
                      console.log('text successful');
                    } else {
                      console.log('text unsuccessful');
                    }
                  });

                  //show rest period
                  this.showRest = true;
                  //hide exercise details
                  this.showExercise = false;

                  if((i + 2) > exerciseList.length){
                    //if its the last iteration then theres no rest or next exercise
                    this.setRest = 0;
                    this.nextExercise = "Workout Complete!!!"
                  }else{
                    //rest period
                    this.setRest = exerciseList[i].exercise_rest;
                  }
                }, exerciseList[i].exercise_duration);  

            }, 1000);

        //else every other set in the workout
        }else{

            runningDuration += +exerciseList[i-1].exercise_duration + +exerciseList[i-1].exercise_rest;
            
            setTimeout(() => {  
                //display the current exercise's name, duration, next exercise and rest period on the page with property binding

                //send the userExercises object to the backend to text out the current exercise
                this.userExerciseService.textUserExercise(userExercise).subscribe((response) => {
                  if (response) {
                    console.log('text successful');
                  } else {
                    console.log('text unsuccessful');
                  }
                });
                
                //show exercise details
                this.showExercise = true;
                //hide rest period
                this.showRest = false;
                
                //current exercise
                this.currentExercise = exerciseList[i].exercise_name;
                //set duration
                this.setDuration = exerciseList[i].exercise_duration;
                //next exercise (if not the end of the array)
                if((i + 2) > exerciseList.length){
                  this.nextExercise = 'None';
                }else{
                  this.nextExercise = exerciseList[i+1].exercise_name;
                }

                setTimeout(() =>{

                  //send the userExercise object to the backend to text out the rest period and next exercise
                  this.userExerciseService.textUserExercise(userExercise).subscribe((response) => {
                    if (response) {
                      console.log('text successful');
                    } else {
                      console.log('text unsuccessful');
                    }
                  });

                  //hide exercise details
                  this.showExercise = false;
                  //show rest period
                  this.showRest = true;
                  
                  if((i + 2) > exerciseList.length){
                    //if its the last iteration then theres no rest or next exercise
                    this.setRest = 0;
                    this.nextExercise = "Workout Complete!!!"
                  }else{
                  //rest period
                  this.setRest = exerciseList[i].exercise_rest;
                  }
                }, exerciseList[i].exercise_duration);

            }, runningDuration); //the timer should equal a running total of the previous iterations duration plus rest, so it waits that long until displaying the next set.  
        }
    }

    console.log('loop done');
  }

}
