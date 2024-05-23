import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { StoreService } from './services/store.service';
import { PrimeNGConfig } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule, MenuModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'task-management-system';
  items = [
    {
      label: 'Task',
      items: [
        { label: 'List', icon: 'pi pi-list', route: 'tasks/list' },
        { label: 'Add', icon: 'pi pi-plus', route: 'tasks/add' },
      ],
    },
  ];

  constructor(
    private _storeService: StoreService,
    private _primengConfig: PrimeNGConfig
  ) {
    this._storeService.initRetriveStoreData();
    this._primengConfig.ripple = true;
    this._primengConfig.zIndex = {
      modal: 1100, // dialog, sidebar
      overlay: 1000, // dropdown, overlaypanel
      menu: 1000, // overlay menus
      tooltip: 1100, // tooltip
    };
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {}
}
