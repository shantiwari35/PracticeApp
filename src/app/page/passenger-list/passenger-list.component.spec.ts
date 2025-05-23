import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerListComponent } from './passenger-list.component';

describe('PassengerListComponent', () => {
  let component: PassengerListComponent;
  let fixture: ComponentFixture<PassengerListComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
