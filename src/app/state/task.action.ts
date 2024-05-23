import { createAction, props } from '@ngrx/store';
import { ITask } from '../interfaces/task.interface';

export const retrieveTask = createAction('[Task Data] Retrieve Task', props<{ payload: ITask[] }>());
export const addTask = createAction('[Task Data] Add Task', props<{ payload: ITask }>());
export const updateTask = createAction('[Task Data] Update Task', props<{ payload: ITask, index: number }>());
export const changeTaskStatus = createAction('[Task Data] Update Task Status', props<{ index: number }>());
export const removeTask = createAction('[Task Data] Remove Task', props<{ index: number }>());
export const clearTask = createAction('[Task Data] Clear Task');
