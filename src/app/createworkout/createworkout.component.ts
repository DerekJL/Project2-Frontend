import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../services/exercise.service';
import { Router } from '../../../node_modules/@angular/router';
import { Exercise } from '../models/exercise';
import { User } from '../models/user';
import { Workout } from '../models/workout';
import { WorkoutService } from '../services/workout.service';
import { Modal } from '../../../node_modules/ngx-modialog/plugins/bootstrap';

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
  workoutExercises: Exercise[] = [];
  isPublicValue = (this.publicValue === 0) ? false : true;

  constructor(private exerciseService: ExerciseService, private router: Router,
    private workoutService: WorkoutService, private modal: Modal) { }

  ngOnInit() {
    if (this.loggedUser !== null) {
      this.exerciseService.getExercisesByUserId(this.loggedUser.user_id).subscribe(response => {
        this.myExercises = response;
      });
      this.exerciseService.getAllExercises().subscribe(response => {
        this.allExercises = response;
      });
    }
  }

  createWorkout() {
    this.workout.exercises = this.workoutExercises;
    this.workoutService.createWorkout(this.workout).subscribe(response => {
      if (response !== undefined || response !== null) {
        this.workout = response;
        this.router.navigate(['workoutlanding']);
      }
    });
  }

  addPublicExercise() {
    if (this.publicValue !== 0) {
      console.log(this.publicValue);
      this.exerciseService.getExerciseById(this.publicValue).subscribe(response => {
        if (response !== undefined || response !== null) {
          this.workoutExercises.push(response);
        }
      });
    }
  }
  changePublicValue(event: any) {
    console.log('Public event target value:' + event.target.value);
    this.publicValue = event.target.value;
    this.isPublicValue = (this.publicValue === 0) ? false : true;
  }

  addPersonalExercise() {
    console.log(this.personalValue);
    if (this.personalValue !== 0) {
      this.exerciseService.getExerciseById(this.personalValue).subscribe(response => {
        if (response !== undefined || response !== null) {
          this.workoutExercises.push(response);
        }
      });
    }
  }
  changePersonalValue(event: any) {
    console.log('Personal event target value: ' + event.target.value);
    this.personalValue = event.target.value;
  }

  openPersonalModal() {
    this.modal.alert()
    .size('lg')
    .isBlocking(true)
    .showClose(false)
    .keyboard(27)
    .title('personal')
    .body('hello')
    .open();
  }

  openPublicModal() {
    this.modal.alert()
    .size('lg')
    .isBlocking(true)
    .showClose(false)
    .keyboard(27)
    .title('public')
    .body('hello')
    .open();
  }

  removeExercise(exercise: Exercise) {
    console.log(exercise);
    this.workoutExercises = this.workoutExercises.filter(elem =>
      elem !== exercise
    );
    console.log(this.workoutExercises);
  }

}
