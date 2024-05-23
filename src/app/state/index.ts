import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { taskReducer } from './task.reducer';

export const reducers: ActionReducerMap<AppState> = {
  task: taskReducer,
};
