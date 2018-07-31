import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkoutLandingComponent } from './workout-landing/workout-landing.component';
import { ExerciselandingComponent } from './exerciselanding/exerciselanding.component';

const ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
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
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(ROUTES)],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
