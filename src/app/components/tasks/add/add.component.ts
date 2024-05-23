import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { TASK_STATUS } from '../../../enum/task-status.enum';
import { TaskService } from '../../../services/task.service';
import { ITask } from '../../../interfaces/task.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent implements OnInit {
  public form: FormGroup;
  public taskIndex: number | null = null;

  constructor(
    private fb: FormBuilder,
    private _taskService: TaskService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.form = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      created_by: ['Jhon Smith', Validators.required],
      status: [TASK_STATUS.NEW, Validators.required],
      created_at: [new Date().toISOString(), Validators.required],
      updated_at: [new Date().toISOString(), Validators.required],
    });
    const taskIndexParam = this._route.snapshot.paramMap.get('taskIndex');
    this.taskIndex = taskIndexParam != null ? Number(taskIndexParam) : null;
  }

  ngOnInit(): void {
    if (this.taskIndex != null) {
      const existingTaskData: ITask | undefined = this._taskService.getOne(this.taskIndex);
      if(!existingTaskData) return;
      this.form.patchValue({
        title: existingTaskData.title,
        description: existingTaskData.description,
        created_by: existingTaskData.created_by,
        status: TASK_STATUS.UPDATED,
        created_at: existingTaskData.created_at,
        updated_at: new Date().toISOString(),
      })
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const task: ITask = { ...this.form.value };
    if(this.taskIndex == null) {
      this._taskService.add(task);
    } else {
      this._taskService.update(task, this.taskIndex);
    }
    this._router.navigate(['tasks']);
  }
  
}
