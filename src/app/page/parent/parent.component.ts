import { Component, inject, ViewChild, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Child1Component } from "./child1/child1.component";
import { Child2Component } from "./child2/child2.component";
import { FormsModule } from '@angular/forms';
import { ParentService } from './parent.service';
import { AltPressedDirective } from '../../directive/alt-pressed.directive';

@Component({
  selector: 'app-parent',
  imports: [RouterOutlet, Child1Component, Child2Component, FormsModule,AltPressedDirective],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss'
})
export class ParentComponent {

  message: string = "";
  @ViewChild('child1') child1!: Child1Component;
  // child1! = viewChild(Child1Component) ;
  @ViewChild('child2') child2!: Child2Component;

  parentService = inject(ParentService);

  sendMessage() {
    this.parentService.setMessage(this.message);
    this.message = "";
  }

  startSubject() {
    console.log('Subject started')
    this.parentService.startSubject();
  }

  subscribeToBoth(event:Event) {
    alert('Subscribe to Both')
    console.log(event);
    this.child1.subscribeToBehaviourSubject();
    this.child2.subscribeSubject();
  }

}
