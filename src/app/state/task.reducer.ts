import { createReducer, on } from '@ngrx/store';

import {
  retrieveTask,
  addTask,
  updateTask,
  removeTask,
  changeTaskStatus,
} from './task.action';
import { ITask } from '../interfaces/task.interface';
import { TASK_STATUS } from '../enum/task-status.enum';

export const initialState: ITask[] = [];

export const taskReducer = createReducer(
  initialState,
  on(retrieveTask, (state, { payload }) => payload),
  on(addTask, (state, { payload }) => [...state, payload]),
  on(updateTask, (state, { payload, index }) => {
    const newPayload = state.map((task, i) => {
      if(i == index) return payload;
      return task;
    });
    return newPayload;
  }),
  on(changeTaskStatus, (state, { index }) => {
    const newPayload = state.map((task, i) => {
      if (i == index) return { ...task, status: TASK_STATUS.FINISH };
      return task;
    });
    return newPayload;
  }),
  on(removeTask, (state, { index }) => {
    const newPayload = state.filter((task, i) => i !== index);
    return newPayload;
  })
);
