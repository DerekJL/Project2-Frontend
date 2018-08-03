import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkoutLandingComponent } from './workout-landing/workout-landing.component';
import { ExerciselandingComponent } from './exerciselanding/exerciselanding.component';
import { WorkoutguideComponent } from './workoutguide/workoutguide.component';
import { CreateexerciseComponent } from './createexercise/createexercise.component';
import { CreateworkoutComponent } from './createworkout/createworkout.component';

const ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'workoutlanding',
        component: WorkoutLandingComponent
    },
    {
        path: 'exerciselanding',
        component: ExerciselandingComponent
    },
    {
        path: 'workoutguide',
        component: WorkoutguideComponent
    },
    {
        path: 'createexercise',
        component: CreateexerciseComponent
    },
    {
        path: 'createworkout',
        component: CreateworkoutComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(ROUTES)],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
