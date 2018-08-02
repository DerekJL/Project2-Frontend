import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../services/exercise.service';
import { Router } from '../../../node_modules/@angular/router';
import { Exercise } from '../models/exercise';
import { User } from '../models/user';

@Component({
  selector: 'app-createexercise',
  templateUrl: './createexercise.component.html',
  styleUrls: ['./createexercise.component.css']
})
export class CreateexerciseComponent implements OnInit {

  exercise: Exercise = new Exercise();

  loggedUser = sessionStorage.getItem('user');
  user: User = JSON.parse(this.loggedUser);

  isValidName = true;
  isValidSets = true;
  isValidReps = true;
  isValidDuration = true;
  isValidRest = true;

  constructor(private exerciseService: ExerciseService, private router: Router) { }

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

    return returningBool;
  }

}
