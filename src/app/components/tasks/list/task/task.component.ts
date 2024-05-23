import { Component, Input } from '@angular/core';
import { TASK_STATUS } from '../../../../enum/task-status.enum';
import { TagModule } from 'primeng/tag';
import { MenuModule } from 'primeng/menu';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TaskService } from '../../../../services/task.service';
import { ButtonModule } from 'primeng/button';
import { TruncatePipe } from '../../../../pipes/truncate.pipe';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TagModule, MenuModule, ButtonModule, TruncatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input() task: any;
  @Input() index!: number;
  public cardMenu: MenuItem[] = [
    {
      label: 'Finish',
      icon: 'pi pi-fw pi-check',
      command: (e) => {
        this.changeTaskStatus(this.index);
      },
    },
    {
      label: 'Update',
      icon: 'pi pi-fw pi-pencil',
      command: (e) => {
        this.editTask(this.index);
      },
    },
    {
      label: 'Delete',
      icon: 'pi pi-fw pi-trash',
      command: (e) => {
        this.deleteTask(this.index);
      },
    },
  ];

  constructor(private _taskService: TaskService, private _router: Router) {}

  getStatus(status: number): string | undefined {
    switch (status) {
      case TASK_STATUS.NEW:
        return 'New';
      case TASK_STATUS.INPROGRESS:
        return 'In Progress';
      case TASK_STATUS.UPDATED:
        return 'Updated';
      case TASK_STATUS.FINISH:
        return 'Finish';
      default:
        return undefined;
    }
  }
  getStatusColor(status: number) {
    switch (status) {
      case TASK_STATUS.NEW:
        return 'info';
      case TASK_STATUS.INPROGRESS:
        return 'warning';
      case TASK_STATUS.UPDATED:
        return 'danger';
      case TASK_STATUS.FINISH:
        return 'success';
      default:
        return undefined;
    }
  }

  public editTask(index: number) {
    this._router.navigate(['/tasks', index]);
  }
  public changeTaskStatus(index: number) {
    this._taskService.finish(index);
  }
  public deleteTask(index: number) {
    this._taskService.remove(index);
  }
}
