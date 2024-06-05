import { Component } from '@angular/core';
import { TaskService } from '../../../../services/task.service';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from '../../../../models/task.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
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
  displayedColumns: string[] = ['title', 'description', 'dtconclusion', 'status', 'actions'];

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.load()
  }

  load() {
    this.taskService.getAll()
      .subscribe(data => {
        if (data) {
          this.tasks = data
        }
      })
  }

  delete(id: number) {
    this.taskService.delete(id)
      .subscribe(result => {
        console.log(result)
        this.snackBar.open('Tarefa removida com sucesso');
        this.load()
      })
  }

  conclude(id: number) {
    this.taskService.conclude(id)
      .subscribe(result => {
        console.log(result)
        this.snackBar.open('Tarefa concluída com sucesso');
        this.load()
      })
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigateByUrl("/login");
  }
}
