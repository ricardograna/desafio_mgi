import { Component } from '@angular/core';
import { TaskService } from '../../../../services/task.service';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../../../models/task.model';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatTableModule, MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule
  ],
  providers: [
    TaskService
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class TaskListComponent
{
  tasks: Task[] = []
  displayedColumns: string[] = ['task-title', 'task-description', 'task-dtconclusion', 'task-status'];

  constructor(private router: Router, private taskService: TaskService, private authService: AuthService) {
  }

  ngOnInit() {
    this.taskService.getAll()
      .subscribe(data => {
        if (data) {
          console.log(data)
          this.tasks = data
        }
        console.log(data)
      })
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigateByUrl("/login");
  }
}
