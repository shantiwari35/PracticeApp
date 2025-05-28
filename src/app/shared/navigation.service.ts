import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() { }

  navList = [
    {
      name: 'Home',
      url: 'home'
    },
    {
      name: 'Add Passenger',
      url: 'add-passenger'
    },
    {
      name: 'Passengers',
      url: 'passengers'
    },
    {
      name: 'Login',
      url: 'login'
    },
    {
      name: 'rxjs',
      url: 'rxjs'
    },
    {
      name: 'Subject/BehaviorSubject',
      url: 'parent'
    }
  ];

  getNavList() {

    return of(this.navList);
  }
}
