import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ParentService } from '../parent.service';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child1',
  imports: [CommonModule],
  templateUrl: './child1.component.html',
  styleUrl: './child1.component.scss'
})
export class Child1Component implements OnInit {
  childMessage = computed(() => this.parentService.messageFromParent());
  parentService = inject(ParentService);
  data:string[] = [];
  behaviourSubject$ = new Subject<string[]>();
  ngOnInit(): void {

  }
  removeMessage(item: string) {
    this.parentService.removeMessage(item)
  }

  subscribeToBehaviourSubject() {
    this.parentService.behaviorSubject.subscribe(res =>{
      this.data=[res,...this.data];
      this.behaviourSubject$.next(this.data);
    });
  }
}
