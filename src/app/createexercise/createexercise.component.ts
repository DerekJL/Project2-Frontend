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

  constructor(private exerciseService: ExerciseService, private router: Router) { }

  ngOnInit() {

  }

  addExercise(){
    //set the user id on the exercise
    this.exercise.user_id = this.user.user_id;
    //might need to add exercise type and visibility or take them out
    this.exerciseService.createExercise(this.exercise).subscribe((exercises) => {    
        this.router.navigate(['createexercise']);   
    });
  }

}
