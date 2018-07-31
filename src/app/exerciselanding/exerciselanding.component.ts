import { Component, OnInit } from '@angular/core';
import { Exercise } from '../models/exercise';
import { User } from '../models/user';
import { Router } from '../../../node_modules/@angular/router';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-exerciselanding',
  templateUrl: './exerciselanding.component.html',
  styleUrls: ['./exerciselanding.component.css']
})
export class ExerciselandingComponent implements OnInit {

  exercises: Exercise[];
  loggedUser: User = JSON.parse(localStorage.getItem('user'));

  constructor(private router: Router, private exerciseService: ExerciseService) {}

  ngOnInit() {
  }

}
