import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Task } from '../models/task.model';
import { Observable, map } from 'rxjs';

@Injectable()
export class TaskService
{
  constructor (private baseService: BaseService) {}

  public getAll(): Observable<Task[]> {
    return this.baseService.get('tasks')
      .pipe(
        map((result: any) => {
          if (result && result.success) {
            return (result as any).data.map((item: any) => new Task(item))
          }
        }
      )
    );
  }

  public getOne(id: number) {
    return this.baseService.get(`tasks/${id}`);
  }

  public create(data: Task) {
    return this.baseService.post('tasks', data)
  }

  public update(id: number, data: Task) {
    return this.baseService.put(`tasks/${id}`, data)
  }

  public delete(id: number) {
    return this.baseService.delete(`tasks/${id}`)
  }
}
