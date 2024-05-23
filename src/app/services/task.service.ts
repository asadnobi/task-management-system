import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addTask, changeTaskStatus, removeTask, updateTask } from '../state/task.action';
import { selectTaskdata } from '../state/task.selector';
import { ITask } from '../interfaces/task.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public tasks = new BehaviorSubject<ITask[]>([]);

  constructor(
    private _store: Store,
  ) {
    this._store.select(selectTaskdata).subscribe((value: ITask[]) => {
      this.tasks.next(value);
    });
  }

  getAll(): ITask[] | undefined {
    return this.tasks.value;
  }
  getOne(index: number): ITask | undefined {
    return this.tasks.value[index];
  }

  add(payload: ITask) {
    this._store.dispatch(addTask({ payload }));
  }
  update(payload: ITask, index: number) {
    this._store.dispatch(updateTask({ payload, index }));
  }
  remove(index: number) {
    this._store.dispatch(removeTask({ index }));
  }
  finish(index: number) {
    this._store.dispatch(changeTaskStatus({ index }));
  }
}
