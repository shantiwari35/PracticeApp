import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { paginationAndSortConfig } from '../page/passenger-list/passenger-list-datasource';
@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  apiUrl:string=environment.apiUrl;
  private http=inject(HttpClient);
  constructor() { }

  getPassengers({active, direction, pageIndex, pageSize,search}:paginationAndSortConfig){
    let param=new HttpParams()
    .set('sortBy', active !== undefined ? active : '')
    .set('order', direction !== undefined ? direction : '')
    .set('limit', pageSize !== undefined ? pageSize : '')
    .set('skip', pageIndex!*pageSize! !== undefined ? pageIndex!*pageSize! : '');
    if(search) return this.http.get(`${this.apiUrl}/users/search?q=${search}`);
    return this.http.get(`${this.apiUrl}/users`,{params:param});
  }

  gettotalPassengers(){
    return this.http.get(`${this.apiUrl}/users?limit=0`);
  }
}
