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
  loggedUser: User = JSON.parse(localStorage.getItem('user'));

  constructor(private router: Router, private exerciseService: ExerciseService, private modal: Modal) {}

  ngOnInit() {
    this.getExercises(this.loggedUser.user_id);
  }

  getExercises(user_id: number) {
    this.exerciseService.getExercisesByUserId(user_id).subscribe(response => {
      this.exercises = JSON.parse(<any>response);
    });
  }

  openModal(exercise: Exercise) {
    this.modal.alert()
    .size('lg')
    .isBlocking(true)
    .showClose(false)
    .keyboard(27)
    .title(exercise.exercise_name)
    .body('hello')
    .open();
  }

}
