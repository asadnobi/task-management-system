import { Routes } from '@angular/router';
import { updateGuard } from '../../guards/update.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./list/list.component').then((mod) => mod.ListComponent),
    title: 'Task List',
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./add/add.component').then((mod) => mod.AddComponent),
    title: 'Add Task',
  },
  {
    path: ':taskIndex',
    canActivate: [updateGuard],
    loadComponent: () =>
      import('./add/add.component').then((mod) => mod.AddComponent),
    title: 'Update Task',
  },
];
