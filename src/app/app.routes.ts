import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/others/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./components/tasks/task.routes').then((mod) => mod.routes),
  },
  { path: '**', component: PageNotFoundComponent },
];
