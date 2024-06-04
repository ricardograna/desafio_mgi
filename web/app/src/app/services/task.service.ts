import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Task } from '../models/task.model';
import { Observable, map } from 'rxjs';

@Injectable()
export class TaskService extends BaseService
{
  public getAll(): Observable<Task[]> {
    return this.get('tasks')
      .pipe(
        map((result: any) => {
          if (result && result.success) {
            return (result as any).data.map((item: any) => new Task(item))
          }
        }
      )
    );
  }
}
