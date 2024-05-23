import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITask } from '../interfaces/task.interface';

export const getTaskdata = createFeatureSelector<ITask[]>('task');

export const selectTaskdata = createSelector(getTaskdata, (state) => state);
