import { Routes } from '@angular/router';
import { LoginComponent } from './components/public/login/login.component';
import { RegistrationComponent } from './components/public/registration/registration.component';
import { TaskListComponent } from './components/protected/tasks/list/list.component';

export const routes: Routes = [
    {
        path: 'register',
        component: RegistrationComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
      path: 'tasks',
      component: TaskListComponent
    },
    {
        path: '',
        redirectTo: '/tasks',
        pathMatch: 'full'
    }
];
