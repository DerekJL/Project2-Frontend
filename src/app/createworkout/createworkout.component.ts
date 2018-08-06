import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../services/exercise.service';
import { Router } from '../../../node_modules/@angular/router';
import { Exercise } from '../models/exercise';
import { User } from '../models/user';
import { Workout } from '../models/workout';
import { WorkoutService } from '../services/workout.service';
import { Modal } from '../../../node_modules/ngx-modialog/plugins/bootstrap';
import { WorkoutExercise } from '../models/workoutexercise';

@Component({
  selector: 'app-createworkout',
  templateUrl: './createworkout.component.html',
  styleUrls: ['./createworkout.component.css']
})
export class CreateworkoutComponent implements OnInit {

  workout: Workout = new Workout();
  myExercises: Exercise[];
  allExercises: Exercise[];
  loggedUser: User = JSON.parse(sessionStorage.getItem('user'));
  publicValue = 0;
  personalValue = 0;
  exercises: Exercise[] = [];
  workoutType: number;
  isPublicValue = (this.publicValue === 0) ? false : true;
  makePrivate = false;

  constructor(private exerciseService: ExerciseService, private router: Router,
    private workoutService: WorkoutService, private modal: Modal) { }

  ngOnInit() {
    if (this.loggedUser !== null) {
      this.exerciseService.getExercisesByUserId(this.loggedUser.user_id).subscribe(response => {
        this.myExercises = response;
      });
      this.exerciseService.getAllExercises().subscribe(response1 => {
        this.allExercises = response1;
      });
    }
  }

  createWorkout() {
    console.log(this.workout);
    this.workout.user_id = this.loggedUser.user_id;
    if (this.workout.workout_description === null) {
     this.workout.workout_description = 'No description';
    }
    this.workoutService.createWorkout(this.workout).subscribe((workouts) => {
      // check if exercise was created successfully
      if (workouts === null || workouts === undefined) {
        // console.log('workout was not created or returned successfully');
      } else {
        // console.log('workout created successfully');
        // console.log(JSON.stringify(workouts));
        // set the workout id to this.workouts.workout_id
        this.workout.workout_id = workouts.workout_id;
        if (this.makePrivate) {
          this.workout.workout_visibility = 2;
        }

        // now add a workoutexercise object to the junction table for each exercise in the workout
        for (let i = 0; i < this.exercises.length; i++) {
          // create WorkoutExercise object
          let workoutExercise = new WorkoutExercise();

          // fill the WorkoutExercise object with exercise values and workout id
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

          // call service to send to junction table
          this.workoutService.createWorkoutExercise(workoutExercise).subscribe((response) => {
            // check if workoutexercise was created successfully in the junction table
            if (response === null || response === undefined) {
              // console.log('workoutexercise was not created or returned successfully');
            } else {
              // console.log('workoutexercise created successfully');
              // console.log(JSON.stringify(response));
              this.router.navigate(['workoutlanding']);
            }
          });
        }

      }
    });
  }

  addPublicExercise() {
    if (this.publicValue.toString() !== '0') {
      // console.log(this.publicValue);
      this.exerciseService.getExerciseById(this.publicValue).subscribe(response => {
        if (response !== undefined || response !== null) {
          this.exercises.push(response);
        }
      });
    }
  }
  changePublicValue(event: any) {
    // console.log('Public event target value:' + event.target.value);
    this.publicValue = event.target.value;
    this.isPublicValue = (this.publicValue === 0) ? false : true;
  }

  addPersonalExercise() {
    // console.log(this.personalValue);
    if (this.personalValue.toString() !== '0') {
      this.exerciseService.getExerciseById(this.personalValue).subscribe(response => {
        if (response !== undefined || response !== null) {
          this.exercises.push(response);
        }
      });
    }
  }
  changePersonalValue(event: any) {
    // console.log('Personal event target value: ' + event.target.value);
    this.personalValue = event.target.value;
  }

  openPersonalModal() {
    this.exerciseService.getExerciseById(this.personalValue).subscribe(response => {
      // console.log(response);
      let responseDescription = '<li> Description: ' + response.exercise_description + '</li>';
      let responseSets = '<li> Sets: ' + response.exercise_sets + '</li>';
      let responseReps = '<li> Reps: ' + response.exercise_reps + '</li>';
      let responseDur = '<li> Duration: ' + response.exercise_duration + '</li>';
      let responseRest = '<li> Rest Between Sets: ' + response.exercise_rest + '</li>';
      if (response.exercise_rest === null) {
        responseRest = '<li> Rest Between Sets: none</li>';
      }
      let modalBody = responseDescription + responseSets + responseReps + responseDur + responseRest;
      this.modal.alert()
        .size('lg')
        .isBlocking(true)
        .showClose(false)
        .keyboard(27)
        .title(response.exercise_name.toUpperCase())
        .body('<ul>' + modalBody + '</ul>')
        .open();
    });
  }

  openPublicModal() {
    this.exerciseService.getExerciseById(this.publicValue).subscribe(response => {
      // console.log(response);
      let responseDescription = '<li> Description: ' + response.exercise_description + '</li>';
      let responseSets = '<li> Sets: ' + response.exercise_sets + '</li>';
      let responseReps = '<li> Reps: ' + response.exercise_reps + '</li>';
      let responseDur = '<li> Duration: ' + response.exercise_duration + '</li>';
      let responseRest = '<li> Rest Between Sets: ' + response.exercise_rest + '</li>';
      if (response.exercise_rest === null) {
        responseRest = '<li> Rest Between Sets: none</li>';
      }
      let modalBody = responseDescription + responseSets + responseReps + responseDur + responseRest;
      this.modal.alert()
        .size('lg')
        .isBlocking(true)
        .showClose(false)
        .keyboard(27)
        .title(response.exercise_name.toUpperCase())
        .body('<ul>' + modalBody + '</ul>')
        .open();
    });
  }

  removeExercise(exercise: Exercise) {
    // console.log(exercise);
    this.exercises = this.exercises.filter(elem =>
      elem !== exercise
    );
    // console.log(this.exercises);
  }

  changeWorkoutType(event: any) {
    // console.log(event.target.value);
    this.workout.type_id = +event.target.value;
  }

  checkboxClicked() {
    this.makePrivate = !this.makePrivate;
  }
}
