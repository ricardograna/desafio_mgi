import { Routes } from '@angular/router';
import { LoginComponent } from './components/public/login/login.component';
import { RegistrationComponent } from './components/public/registration/registration.component';
import { TaskListComponent } from './components/protected/tasks/list/list.component';
import { TaskFormComponent } from './components/protected/tasks/form/form.component';

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
      path: 'tasks/:id',
      component: TaskFormComponent
    },
    {
      path: 'tasks/create',
      component: TaskFormComponent
    },
    {
        path: '',
        redirectTo: '/tasks',
        pathMatch: 'full'
    }
];
