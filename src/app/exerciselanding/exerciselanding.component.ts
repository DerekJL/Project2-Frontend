import { Component, OnInit } from '@angular/core';
import { Exercise } from '../models/exercise';
import { User } from '../models/user';
import { Router } from '../../../node_modules/@angular/router';
import { ExerciseService } from '../services/exercise.service';
import { Modal } from '../../../node_modules/ngx-modialog/plugins/bootstrap';

@Component({
  selector: 'app-exercise-landing',
  templateUrl: './exerciselanding.component.html',
  styleUrls: ['./exerciselanding.component.css']
})
export class ExerciselandingComponent implements OnInit {

  exercises: Exercise[];
  loggedUser: User = JSON.parse(sessionStorage.getItem('user'));

  constructor(private router: Router, private exerciseService: ExerciseService, private modal: Modal) { }

  ngOnInit() {
    this.getExercises(this.loggedUser.user_id);
  }

  getExercises(user_id: number) {
    this.exerciseService.getExercisesByUserId(user_id).subscribe(response => {
      this.exercises = response;
    });
  }

  openModal(exercise: Exercise) {
      let exerciseDescription = '<li> Description: ' + exercise.exercise_description + '</li>';
      let exerciseSets = '<li> Sets: ' + exercise.exercise_sets + '</li>';
      let exerciseReps = '<li> Reps: ' + exercise.exercise_reps + '</li>';
      let exerciseDur = '<li> Duration: ' + exercise.exercise_duration + '</li>';
      let exerciseRest = '<li> Rest Between Sets: ' + exercise.exercise_rest + '</li>';
      if (exercise.exercise_rest === null) {
        exerciseRest = '<li> Rest Between Sets: none</li>';
      }
      let modalBody = exerciseDescription + exerciseSets + exerciseReps + exerciseDur + exerciseRest;
      this.modal.alert()
        .size('lg')
        .isBlocking(true)
        .showClose(false)
        .keyboard(27)
        .title(exercise.exercise_name.toUpperCase())
        .body('<ul>' + modalBody + '</ul>')
        .open();
  }
}
