import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Naufal Adib | Frontend Developer',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: '**',
    title: 'Page Not Found | Naufal Adib',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
