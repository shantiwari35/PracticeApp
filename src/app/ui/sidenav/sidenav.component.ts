import { Component, inject, OnInit } from '@angular/core';
import { NavigationService } from '../../shared/navigation.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, Observable, Observer } from 'rxjs';

@Component({
    selector: 'app-sidenav',
    imports: [AsyncPipe,RouterLink],
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

    private navLinks = inject(NavigationService);

    getList(): Observable<any> {
        return this.navLinks.getNavList();
    }


}
