import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject, InjectFlags, OnInit, signal } from '@angular/core';
import { BehaviorSubject, concatMap, delay, exhaustMap, filter, forkJoin, interval, map, mergeMap, Observable, of, switchMap, take, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-rxjs-operator',
  imports: [CommonModule],
  templateUrl: './rxjs-operator.component.html',
  styleUrl: './rxjs-operator.component.scss'
})
export class RxjsOperatorComponent implements OnInit {


  https = inject(HttpClient);
  card$ = new BehaviorSubject<any[]>([{
    userId: '', id: '', title: '', body: ''
  }]);

  card = signal<any[]>([]);
  
  postIds= of(1,2,3,4,5) // Emits values over time;


  ngOnInit(): void {

  }

  
  createMergeMap() {
    this.card.set([]);
    this.postIds.pipe(delay(500),map(data=>{if(data==5){
      return data*2
    }else{
      return data;
    }}),
      mergeMap(postId => this.https.get(`https://jsonplaceholder.typicode.com/posts/${postId}`))
  ).subscribe((data: any) => {
      this.card.set([...this.card(), data])
    });
  }

  createconcatMap() {
    this.card.set([]);
    this.postIds.pipe(delay(500),
      concatMap(postId => this.https.get(`https://jsonplaceholder.typicode.com/posts/${postId}`))
    ).subscribe((data: any) => {
      this.card.set([...this.card(), data])
    });

  }

  createSwitchMap() {
    this.card.set([]);
  
    this.postIds.pipe(delay(500),
      switchMap(postId => this.https.get(`https://jsonplaceholder.typicode.com/posts/${postId}`))
    ).subscribe((data: any) => {
      this.card.set([...this.card(), data])
    });
  }

  createExhaustMap() {
    this.card.set([]);
    this.postIds.pipe(delay(500),
      exhaustMap(postId => this.https.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)),
    ).subscribe((data: any) => {
      this.card.set([...this.card(), data])
    });
  }

  createForkJoin() {
    this.card.set([]);
    let fork=[of(1).pipe(delay(100),mergeMap((postId) => this.https.get(`https://jsonplaceholder.typicode.com/posts/${postId}`))),
      of(2).pipe(delay(100),mergeMap((postId) => this.https.get(`https://jsonplaceholder.typicode.com/posts/${postId}`))),
      of(3).pipe(delay(100),mergeMap((postId) => this.https.get(`https://jsonplaceholder.typicode.com/posts/${postId}`))),
      of(4).pipe(delay(100),mergeMap((postId) => this.https.get(`https://jsonplaceholder.typicode.com/posts/${postId}`))),
      of(5).pipe(delay(100),mergeMap((postId) => this.https.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)))]
    forkJoin(fork).subscribe((data: any) => {
      console.log(data);
      data.forEach((element: any) => this.card.set([...this.card(), element]))
    });
}
}
