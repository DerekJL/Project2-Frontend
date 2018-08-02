import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { WorkoutguideComponent } from './workoutguide/workoutguide.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkoutService } from './services/workout.service';
import { ExerciseService } from './services/exercise.service';
import { NavComponent } from './nav/nav.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { WorkoutLandingComponent } from './workout-landing/workout-landing.component';
import { ExerciselandingComponent } from './exerciselanding/exerciselanding.component';
import { CreateexerciseComponent } from './createexercise/createexercise.component';
import { DiscoverComponent } from './discover/discover.component';
import { NavService } from './services/nav.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WorkoutguideComponent,
    DashboardComponent,
    NavComponent,
    CreateexerciseComponent,
    DiscoverComponent,
    SidenavComponent,
    WorkoutLandingComponent,
    ExerciselandingComponent,
    CreateexerciseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [
    UserService, WorkoutService, ExerciseService, NavService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
