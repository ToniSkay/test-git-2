import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', loadComponent: () => import('./features/user/user-list/user-list.component').then(m => m.UserListComponent) },
  { path: 'tasks', loadComponent: () => import('./features/task/task-manager/task-manager.component').then(m => m.TaskManagerComponent) },
  { path: 'notifications', loadComponent: () => import('./features/notification/notification-center/notification-center.component').then(m => m.NotificationCenterComponent) }
];
