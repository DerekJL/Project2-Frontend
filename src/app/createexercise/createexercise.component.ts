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
  buttonDisplay = 'Select Type';

  constructor(private exerciseService: ExerciseService, private router: Router, private workoutService: WorkoutService) { }

  ngOnInit() {

  }

  addExercise() {
    // check if input was valid
    if (this.validFields()) {
      // set the user id on the exercise
      this.exercise.user_id = this.user.user_id;
      console.log('user id for exercise to be added: ' + this.user.user_id);
      // might need to add exercise type and visibility or take them out
      this.exerciseService.createExercise(this.exercise).subscribe((exercises) => {
          // check if exercise was created successfully
          if (exercises === null || exercises === undefined) {
            console.log('exercise was not created or returned successfully');
          } else {
            console.log('exercise created successfully');
            console.log(JSON.stringify(exercises));
          }
          this.router.navigate(['exerciselanding']);
      });
    } else {
      console.log('entered the else statement in addExercise() because some input was not valid');
    }
  }

  validFields(): boolean {
    let returningBool = true;

    if (this.exercise.exercise_name.length < 1) {
      this.isValidName = false;
      returningBool = false;
    } else {
      this.isValidName = true;
    }
    if (this.exercise.exercise_sets < 1) {
      this.isValidSets = false;
      returningBool = false;
    } else {
      this.isValidSets = true;
    }
    if (this.exercise.exercise_reps < 1) {
      this.isValidReps = false;
      returningBool = false;
    } else {
      this.isValidReps = true;
    }
    if (this.exercise.exercise_duration < 1) {
      this.isValidDuration = false;
      returningBool = false;
    } else {
      this.isValidDuration = true;
    }
    if (this.exercise.exercise_rest < 1) {
      this.isValidRest = false;
      returningBool = false;
    } else {
      this.isValidRest = true;
    }
    if (this.exercise.type_id < 1) {
      this.isValidType = false;
      returningBool = false;
    } else {
      this.isValidType = true;
    }

    return returningBool;
  }

  typeOne() {
    this.buttonDisplay = 'Upper Body';
    this.exercise.type_id = 1;
  }
  typeTwo() {
    this.buttonDisplay = 'Lower Body';
    this.exercise.type_id = 2;
  }
  typeThree() {
    this.buttonDisplay = 'Full Body';
    this.exercise.type_id = 3;
  }
  typeFour() {
    this.buttonDisplay = 'Chest';
    this.exercise.type_id = 4;
  }
  typeFive() {
    this.buttonDisplay = 'Back';
    this.exercise.type_id = 5;
  }
  typeSix() {
    this.buttonDisplay = 'Bicepts';
    this.exercise.type_id = 6;
  }
  typeSeven() {
    this.buttonDisplay = 'Tricepts';
    this.exercise.type_id = 7;
  }
  typeEight() {
    this.buttonDisplay = 'Shoulders';
    this.exercise.type_id = 8;
  }
  typeNine() {
    this.buttonDisplay = 'Abs';
    this.exercise.type_id = 9;
  }
  typeTen() {
    this.buttonDisplay = 'Glutes';
    this.exercise.type_id = 10;
  }
  typeEleven() {
    this.buttonDisplay = 'Hamstrings';
    this.exercise.type_id = 11;
  }
  typeTwelve() {
    this.buttonDisplay = 'Quads';
    this.exercise.type_id = 12;
  }
  typeThirteen() {
    this.buttonDisplay = 'Calves';
    this.exercise.type_id = 13;
  }
  typeFourteen() {
    // tslint:disable-next-line:quotemark
    this.buttonDisplay = "Cardio";
    this.exercise.type_id = 14;
  }
}
