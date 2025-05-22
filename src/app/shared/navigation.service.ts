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
    }
  ];

  getNavList() {

    return of(this.navList);
  }
}
