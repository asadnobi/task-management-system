import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { isPlatformBrowser } from '@angular/common';
import { Subject, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { StorageService } from './storage.service';
import { retrieveTask } from '../state/task.action';
import { ITask } from '../interfaces/task.interface';

@Injectable({ providedIn: 'root' })
export class StoreService {
  destroyed$: Subject<boolean> = new Subject();

  constructor(
    private _store: Store,
    @Inject(PLATFORM_ID) private platformId: object,
    private _storageService: StorageService,
    private _actionsSubj: ActionsSubject
  ) {}

  public initRetriveStoreData() {
    this.storeExistingTask();
    this._actionsSubj
      .pipe(
        takeUntil(this.destroyed$),
        switchMap(() => this._store),
        distinctUntilChanged()
      )
      .subscribe((value: any) => {
        // console.log(value)
        if (value.task)
          this._storageService.setItem(
            'local',
            'task-data',
            JSON.stringify(value.task)
          );
      });
  }

  private storeExistingTask() {
    if (isPlatformBrowser(this.platformId)) {
      const payload = this._storageService.getItem('local', 'task-data');
      if (payload) {
        this._store.dispatch(retrieveTask({ payload: JSON.parse(payload) }));
      } else {
        this.someDummyTask();
      }
    }
  }

  private someDummyTask() {
    const payload: ITask[] = [
      {
        title: 'Task 1',
        description:
          'This is a long description for Task 1 that needs truncation.',
        status: 4,
        created_by: 'Jhon Smith',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        title: 'Task 2',
        description: 'Short description.',
        status: 2,
        created_by: 'Jhon Smith',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        title: 'Lorem Ipsum is simply dummy text of the printing',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        status: 1,
        created_by: 'Jhon Smith',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
    this._store.dispatch(retrieveTask({ payload }));
  }
}
