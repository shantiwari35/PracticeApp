import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, OnDestroy, OnInit, viewChild, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { paginationAndSortConfig, PassengerListDataSource, PassengerListItem } from './passenger-list-datasource';
import { PassengerService } from '../../shared/passenger.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { debounce, debounceTime, distinctUntilChanged, filter, fromEvent, map, switchMap, tap } from 'rxjs';

@Component({
    selector: 'app-passenger-list',
    templateUrl: './passenger-list.component.html',
    styleUrl: './passenger-list.component.scss',
    imports: [MatTableModule, MatIconModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, CommonModule, MatProgressSpinnerModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PassengerListComponent implements OnInit, AfterViewInit, OnDestroy {
    private passengerService = inject(PassengerService);
    @ViewChild('search', { static: true }) search!: ElementRef<HTMLInputElement>
    @ViewChild(MatTable) table!: MatTable<PassengerListItem>;
    dataSource = new PassengerListDataSource(this.passengerService);
    sort: paginationAndSortConfig = { active: 'id', direction: 'asc', pageIndex: 0, pageSize: 10 };
    displayedColumns = ['id', 'firstName', 'lastName', 'email', 'phone'];
    private cd = inject(ChangeDetectorRef);

    ngOnInit(): void {
        // let sortPagination: paginationAndSortConfig = { ...this.sort };

        // this.dataSource.getpassengerList(sortPagination);
    }
    /**
     * Called after Angular has fully initialized a component's view.
     * Sets up an observable for keyup events on the search input to debounce user input.
     * Updates the passenger list based on the search query with pagination and sorting.
     * Logs search values and passenger data for debugging.
     */

    ngAfterViewInit(): void {
        const keyEvent$ = fromEvent<KeyboardEvent>(this.search.nativeElement, 'keyup');
        this.dataSource.sort = this.sort;
        let sortPagination: paginationAndSortConfig = { ...this.sort };

        this.dataSource.getpassengerList(sortPagination);

        keyEvent$.pipe(
            debounceTime(500),
            tap((searchValue: KeyboardEvent) => console.log((searchValue.target as HTMLInputElement).value)),
            map((event: KeyboardEvent) => (event.target as HTMLInputElement).value),
            switchMap(async (searchValue) => this.dataSource.getpassengerList({ ...this.sort, search: searchValue }))
        )
            .subscribe((passengers) => {
                console.log(passengers);
            });
    }


    /**
     * Resets the passenger list to its original state, clearing any
     * search query and sorting criteria. If the search input is empty,
     * this method does nothing.
     */
    resetDatatable() {
        if (this.search.nativeElement.value == '') {
            return;
        } else {
            this.ngOnInit();
        }
    }

    sortPassengerList(sort: Sort): void {
        this.sort = { ...this.sort, ...sort };
        this.dataSource.getpassengerList(this.sort);
    }

    gettotalPassengersLength(): any {
        return this.passengerService.gettotalPassengers();
    }

    onPageChange(event: any): void {
        // debugger;
        this.sort = { ...this.sort, ...event };
        this.dataSource.getpassengerList(this.sort!);
    }

    ngOnDestroy(): void {
        this.dataSource.disconnect();
    }
}
