import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    {
        path: 'home',
        loadComponent: () => import('./page/home/home.component').then(m => m.HomeComponent)
    },
    {
    path:'add-passenger',
    loadComponent: () => import('./page/add-passenger/add-passenger.component').then(m => m.AddPassengerComponent)
    },
    {
      path:'passengers',
      loadComponent: () => import('./page/passenger-list/passenger-list.component').then(m => m.PassengerListComponent)

    }
];
