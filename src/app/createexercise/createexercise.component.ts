import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../services/exercise.service';
import { Router } from '../../../node_modules/@angular/router';
import { Exercise } from '../models/exercise';
import { User } from '../models/user';
import { Workout } from '../models/workout';
import { WorkoutService } from '../services/workout.service';
import { WorkoutExercise } from '../models/workoutexercise';

@Component({
  selector: 'app-createexercise',
  templateUrl: './createexercise.component.html',
  styleUrls: ['./createexercise.component.css']
})
export class CreateexerciseComponent implements OnInit {

  exercise: Exercise = new Exercise();
  exercisesForJunction: WorkoutExercise[] = [];

  loggedUser = sessionStorage.getItem('user');
  user: User = JSON.parse(this.loggedUser);
  
  isValidName = true;
  isValidSets = true;
  isValidReps = true;
  isValidDuration = true;
  isValidRest = true;
  isValidType = true;
  buttonDisplay = "Select Type";

  constructor(private exerciseService: ExerciseService, private router: Router, private workoutService: WorkoutService) { }

  ngOnInit() {

  }

  addExercise() {
    //check if input was valid
    if (this.validFields()){
      // set the user id on the exercise
      this.exercise.user_id = this.user.user_id;
      console.log('user id for exercise to be added: '+this.user.user_id);
      // might need to add exercise type and visibility or take them out
      this.exerciseService.createExercise(this.exercise).subscribe((exercises) => {
          //check if exercise was created successfully
          if(exercises === null || exercises === undefined){
            console.log('exercise was not created or returned successfully');
          }else{
            console.log('exercise created successfully');
            console.log(JSON.stringify(exercises));
          }
          this.router.navigate(['createexercise']);
      });
    }else{
      console.log('entered the else statement in addExercise() because some input was not valid')
    }
  }

  validFields(): boolean{
    let returningBool = true;

    if (this.exercise.exercise_name.length < 1) {
      this.isValidName = false;
      returningBool = false;
    } else{
      this.isValidName = true;
    }
    if (this.exercise.exercise_sets < 1) {
      this.isValidSets = false;
      returningBool = false;
    } else{
      this.isValidSets = true;
    }
    if (this.exercise.exercise_reps < 1) {
      this.isValidReps = false;
      returningBool = false;
    } else{
      this.isValidReps = true;
    }
    if (this.exercise.exercise_duration < 1) {
      this.isValidDuration = false;
      returningBool = false;
    } else{
      this.isValidDuration = true;
    }
    if (this.exercise.exercise_rest < 1) {
      this.isValidRest = false;
      returningBool = false;
    } else{
      this.isValidRest = true;
    }
    if(this.exercise.type_id < 1){
      this.isValidType = false;
      returningBool = false;
    }else{
      this.isValidType = true;
    }

    return returningBool;
  }

  typeOne(){
    this.buttonDisplay = "Upper Body";
    this.exercise.type_id = 1;
  }
  typeTwo(){
    this.buttonDisplay = "Lower Body";
    this.exercise.type_id = 2;
  }
  typeThree(){
    this.buttonDisplay = "Full Body";
    this.exercise.type_id = 3;
  }
  typeFour(){
    this.buttonDisplay = "Chest";
    this.exercise.type_id = 4;
  }
  typeFive(){
    this.buttonDisplay = "Back";
    this.exercise.type_id = 5;
  }
  typeSix(){
    this.buttonDisplay = "Bicepts";
    this.exercise.type_id = 6;
  }
  typeSeven(){
    this.buttonDisplay = "Tricepts";
    this.exercise.type_id = 7;
  }
  typeEight(){
    this.buttonDisplay = "Shoulders";
    this.exercise.type_id = 8;
  }
  typeNine(){
    this.buttonDisplay = "Abs";
    this.exercise.type_id = 9;
  }
  typeTen(){
    this.buttonDisplay = "Glutes";
    this.exercise.type_id = 10;
  }
  typeEleven(){
    this.buttonDisplay = "Hamstrings";
    this.exercise.type_id = 11;
  }
  typeTwelve(){
    this.buttonDisplay = "Quads";
    this.exercise.type_id = 12;
  }
  typeThirteen(){
    this.buttonDisplay = "Calves";
    this.exercise.type_id = 13;
  }
  typeFourteen(){
    this.buttonDisplay = "Cardio";
    this.exercise.type_id = 14;
  }

  //workout object
  workout: Workout = new Workout();
  //exercise array
  exercises: Exercise[] = [];

  testSubmitWorkout(){

    //creates a workout for testing
    //out of testing you just need access to the workout object that's full of the user input. You can also fill in other variables here if they arent populated already such as userid and workout visibility
    this.workout.type_id = 1;
    this.workout.user_id = 2;
    this.workout.workout_visibility = 1;
    this.workout.workout_description = "this is another workout description";
    this.workout.workout_name = "test workout name 2";
    this.workout.queued_workout = 1;
    
    //adds exercises to the exercise array for testing
    //out of testing you just need access to the exercise array that you pushed the user chosen exercises to.
    for (let i = 0; i < 3; i++){
    let ex = new Exercise();
    ex.user_id = 1;
    ex.type_id = 2;
    ex.exercise_sets = 6;
    ex.exercise_rest = 90;
    ex.exercise_reps = 5;
    ex.exercise_name = 'test ' + i +' exercise name';
    ex.exercise_id = 1;
    ex.exercise_duration = 60;
    ex.exercise_description = 'test exercise description';
    this.exercises.push(ex);
    }

    //add workout to database
    this.workoutService.createWorkout(this.workout).subscribe((workouts) => {
      //check if exercise was created successfully
      if(workouts === null || workouts === undefined){
        console.log('workout was not created or returned successfully');
      }else{
        console.log('workout created successfully');
        console.log(JSON.stringify(workouts));
        //set the workout id to this.workouts.workout_id
        this.workout.workout_id = workouts.workout_id;

        //now add a workoutexercise object to the junction table for each exercise in the workout
        for (let i = 0; i < this.exercises.length; i ++){
          //create WorkoutExercise object
          let workoutExercise = new WorkoutExercise();

          //fill the WorkoutExercise object with exercise values and workout id
          workoutExercise.exercise_id = this.exercises[i].exercise_id;
          workoutExercise.exercise_description = this.exercises[i].exercise_description;
          workoutExercise.exercise_duration = this.exercises[i].exercise_duration;
          workoutExercise.exercise_name = this.exercises[i].exercise_name;
          workoutExercise.exercise_reps = this.exercises[i].exercise_reps;
          workoutExercise.exercise_rest = this.exercises[i].exercise_rest;
          workoutExercise.exercise_sets = this.exercises[i].exercise_sets;
          workoutExercise.type_id = this.exercises[i].type_id;
          workoutExercise.user_id = this.exercises[i].user_id;
          workoutExercise.workout_id = this.workout.workout_id;
    
          //call service to send to junction table
          this.workoutService.createWorkoutExercise(workoutExercise).subscribe((response) => {
            //check if workoutexercise was created successfully in the junction table
            if(response === null || response === undefined){
              console.log('workoutexercise was not created or returned successfully');
            }else{
              console.log('workoutexercise created successfully');
              console.log(JSON.stringify(response));
            }
          });
        } 

      }
    });     
  }
}
