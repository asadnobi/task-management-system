import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TaskService } from '../services/task.service';

export const updateGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const _taskService = inject(TaskService);

  const taskIndex = Number(route.paramMap.get('taskIndex'));
  const tasks = _taskService.getAll();
  if (isNaN(taskIndex) || !tasks || taskIndex < 0 || taskIndex >= tasks.length) {
    // If taskIndex is not a number or out of bounds, redirect to the list
    return _router.createUrlTree(['/']);
  } else {
    return true;
  }
};