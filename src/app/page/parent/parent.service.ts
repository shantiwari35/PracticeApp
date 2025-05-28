import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, concatMap, delay, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor() { }

  messageFromParent=signal<string[]>([])
  normalSubject=new Subject<string>;
  behaviorSubject=new BehaviorSubject<string>('');
  setMessage(message:string){
    this.messageFromParent.update(mes=>[...mes,message]);
  }
  removeMessage(message:string){
    this.messageFromParent.update(mes=>mes.filter(m=>m!==message));
  }

  startSubject(){
    console.log('in subject')
 of("hello-subject", "world-subject", "how-subject", "are-subject", "you-subject", "all-subject")
  .pipe(
    concatMap(data => of(data).pipe(delay(1000))) // Emits each value with a 1-second gap
  )
  .subscribe(data => this.normalSubject.next(data));
    of("hello-subject","world-subject",'how-subject','are-subject','you-subject','all-subject').pipe(
      concatMap(data=>of(data).pipe(delay(1000)))).subscribe(data=>this.behaviorSubject.next(data));
  }
}
