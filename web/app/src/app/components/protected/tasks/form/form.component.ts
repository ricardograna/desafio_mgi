import { Component } from '@angular/core';
import { TaskService } from '../../../../services/task.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { Task } from '../../../../models/task.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class TaskFormComponent
{
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private taskService: TaskService)
  {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required],
      dt_expected_completion: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.taskService.create(new Task(this.form.value))
        .subscribe(response => {
          console.log('Success!', response);
          this.router.navigateByUrl('/tasks');
        }, error => {
          console.error('Error!', error);
        });
    }
  }
}
