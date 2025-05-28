import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: () => {
      if (sessionStorage.getItem('user')) {
        return 'home';
      } else {
        return 'login';
      }
    }
  },
  { path: 'login', loadComponent: () => import('./page/login/login.component').then(m => m.LoginComponent) },
  {
    path: 'home',
    loadComponent: () => import('./page/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'add-passenger',
    loadComponent: () => import('./page/add-passenger/add-passenger.component').then(m => m.AddPassengerComponent)
  },
  {
    path: 'passengers',
    loadComponent: () => import('./page/passenger-list/passenger-list.component').then(m => m.PassengerListComponent)

  },
  {
    path: 'rxjs',
    loadComponent: () => import('./Rxjs/rxjs-operator/rxjs-operator.component').then(m => m.RxjsOperatorComponent)

  },
  {
    path: 'parent',
    loadComponent: () => import('./page/parent/parent.component').then(m => m.ParentComponent),
    children: [
      { path: 'child1', loadComponent: () => import('./page/parent/child1/child1.component').then(m => m.Child1Component) },
      { path: 'child2', loadComponent: () => import('./page/parent/child2/child2.component').then(m => m.Child2Component) },
    ]

  }
];
