import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { map, tap } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { inject, OnInit } from '@angular/core';
import { PassengerService } from '../../shared/passenger.service';

// TODO: Replace this with your own data model type
export interface PassengerListItem {
  name: string;
  id: number;
}

export interface paginationAndSortConfig {
  active: string|undefined;
  direction: string|undefined;
  pageIndex: number|undefined;
  pageSize: number|undefined;
  search?:string
}



/**
 * Data source for the PassengerList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PassengerListDataSource extends DataSource<any> {
  data!: any[];
  length$=new BehaviorSubject<number>(0)
  passengers$ = new BehaviorSubject<any[]>([]);
  isLoadingResults$ = new BehaviorSubject<boolean>(false);
  paginator: MatPaginator | undefined;
  sort: paginationAndSortConfig|undefined;
  
  constructor(private passengerService: PassengerService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<any[]> {
    // debugger;
    return this.passengers$.asObservable();
    // if (this.paginator && this.sort) {
    //   // Combine everything that affects the rendered data into one update
    //   // stream for the data-table to consume.
    //   return merge(this.passengers$, this.paginator.page, this.sort.sortChange)
    //     .pipe(tap((data) => console.log(data)), map(() => {
    //       return this.getPagedData(this.getSortedData([...this.data]));
    //     }));
    // } else {
    //   throw Error('Please set the paginator and sort on the data source before connecting.');
    // }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    this.passengers$.complete();
   }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
 

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */

  getpassengerList(data:paginationAndSortConfig):void {
    this.isLoadingResults$.next(true);
    this.sort=data;
    this.passengerService.getPassengers(data).subscribe((passengers: any) => {
      this.passengers$.next(passengers.users);
      this.length$.next(passengers.total);
      this.isLoadingResults$.next(false);
    }
      ,
      (error: any) => console.log(error));
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
