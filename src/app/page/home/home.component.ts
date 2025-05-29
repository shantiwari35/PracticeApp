import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  activateRoute=inject(ActivatedRoute);

  constructor() { }
  ngOnInit(): void {
  this.activateRoute.queryParams.subscribe((res:any)=>{console.log(res)});
  }

}
