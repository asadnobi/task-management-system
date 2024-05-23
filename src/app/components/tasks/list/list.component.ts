import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ITask } from '../../../interfaces/task.interface';
import { TaskService } from '../../../services/task.service';
import { Router, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';

import { MenuItem, SelectItem } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { DataView, DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { TASK_STATUS } from '../../../enum/task-status.enum';
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    TaskComponent,
    TableModule,
    ButtonModule,
    CommonModule,
    RouterLink,
    CardModule,
    SplitButtonModule,
    ToolbarModule,
    DataViewModule,
    DropdownModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [TaskService],
})
export class ListComponent implements OnInit, AfterViewInit {
  public tasks: ITask[] = [];
  public activeTaskIndex!: number;

  public filterOptions: SelectItem[] = [
    { label: 'All', value: null },
    { label: 'New', value: TASK_STATUS.NEW },
    { label: 'In Progress', value: TASK_STATUS.INPROGRESS },
    { label: 'Finish', value: TASK_STATUS.FINISH },
  ];

  constructor(
    private _taskService: TaskService,
    private _cdref: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.getTaskList();
  }

  private getTaskList() {
    this._taskService.tasks.subscribe({
      next: (value) => {
        this.tasks = value;
        this._cdref.detectChanges();
      },
      error: (err) => {},
    });
  }


  filterBy(dv: DataView, event: any) {
    dv.filter(event.value);
  }

  
}
