import { Injectable, Inject, makeStateKey, TransferState } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor(private transferState: TransferState, @Inject(PLATFORM_ID) private platformId: Object) {}

  getItem(storageType: string, key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      if (storageType == 'local') return localStorage.getItem(key);
      if (storageType == 'session') return sessionStorage.getItem(key);
      return null;
    } else {
      const stateKey = makeStateKey<string>(key);
      return this.transferState.get(stateKey, null);
    }
  }

  setItem(storageType: string, key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      if (storageType == 'local') localStorage.setItem(key, value);
      if (storageType == 'session') sessionStorage.setItem(key, value);
    } else {
      const stateKey = makeStateKey<string>(key);
      this.transferState.set(stateKey, value);
    }
  }

  removeItem(storageType: string, key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      if (storageType == 'local') localStorage.removeItem(key);
      if (storageType == 'session') sessionStorage.removeItem(key);
    } else {
      const stateKey = makeStateKey<string>(key);
      this.transferState.remove(stateKey);
    }
  }

  clear(storageType: string): void {
    if (isPlatformBrowser(this.platformId)) {
      if (storageType == 'local') localStorage.clear();
      if (storageType == 'session') sessionStorage.clear();
    } else {
      // return null;
    }
  }

  key(index: number): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.key(index);
    } else {
      return null;
    }
  }
}
