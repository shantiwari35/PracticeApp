import { Component, computed, inject } from '@angular/core';
import { ParentService } from '../parent.service';
import { Subject, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child2',
  imports: [CommonModule],
  templateUrl: './child2.component.html',
  styleUrl: './child2.component.scss'
})
export class Child2Component {

  message = computed(() => this.parentService.messageFromParent())
  data:string[] = [];
  data$ = new Subject<string[]>();
  parentService = inject(ParentService)
  removeMessage(item: string) {
    this.parentService.removeMessage(item)
  }

  subscribeSubject() {
    console.log(this.data,"data arr");
    this.parentService.normalSubject.pipe(tap(data => console.log(data))).subscribe(res => {
      this.data =[res,...this.data];
      console.log(this.data)
      this.data$.next(this.data)
    });
  }
}