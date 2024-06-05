import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../../services/task.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import {MatMomentDateModule} from '@angular/material/moment-adapter';
import { Task } from '../../../../models/task.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatDatepickerModule
  ],
  providers: [
    TaskService,
    provideNativeDateAdapter(),
    provideMomentDateAdapter(undefined, {useUtc: true}),
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class TaskFormComponent implements OnInit
{
  taskId: any;
  task?: Task | null;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute : ActivatedRoute,
    private taskService: TaskService
  ) {
    this.task = null;
    this.form = this.setupForm()
  }

  setupForm() {
    return this.fb.group({
      title: [this.task?.title, [Validators.required]],
      description: [this.task?.description, Validators.required],
      dt_expected_completion: [this.task?.dt_expected_completion, Validators.required]
    });
  }

  ngOnInit(): void {
    this.taskId = this.activatedRoute.snapshot.paramMap.get("id")

    if (this.taskId) {
      this.taskService.getOne(this.taskId)
        .subscribe(result => {
          this.task = new Task((result as any).data)
          this.form = this.setupForm()
        })
    }
  }

  onSubmit() {
    if (this.form.valid) {
      if (!this.task)
      {
        this.taskService.create(new Task(this.form.value))
          .subscribe(response => {
            this.snackBar.open('Tarefa criada com sucesso');
            this.router.navigateByUrl('/tasks');
          }, error => {
            console.error('Error!', error);
          });
      } else {
        this.taskService.update(this.taskId, new Task(this.form.value))
          .subscribe(response => {
            this.snackBar.open('Tarefa alterada com sucesso');
            this.router.navigateByUrl('/tasks');
          }, error => {
            console.error('Error!', error);
          });
      }
    }
  }
}
