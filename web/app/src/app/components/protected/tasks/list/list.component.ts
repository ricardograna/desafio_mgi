import { Component } from '@angular/core';
import { TaskService } from '../../../../services/task.service';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Task } from '../../../../models/task.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatTableModule, MatToolbarModule
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
  displayedColumns: string[] = ['task-title', 'task-description', 'task-status'];

  constructor(private taskService: TaskService) {
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
}
