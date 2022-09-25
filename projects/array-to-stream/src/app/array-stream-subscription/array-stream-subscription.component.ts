import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  map,
  tap,
  take,
  skip,
  delay,
  takeWhile,
  distinctUntilChanged,
  concatMap,
  combineLatest,
  debounce,
  interval,
  mergeMap,
  from,
  of,
  concat,
  debounceTime,
  finalize,
  merge,
  forkJoin,
} from 'rxjs';
import { ArrayToStreamService } from '../array-to-stream.service';

@Component({
  selector: 'app-array-stream-subscription',
  templateUrl: './array-stream-subscription.component.html',
  styleUrls: ['./array-stream-subscription.component.scss'],
})
export class ArrayStreamSubscriptionComponent implements OnInit {
  constructor(
    private arrayService: ArrayToStreamService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.arrayService.arrayStream$.pipe(
      skip(2),
      tap((value) => console.log(value)),
      map((value) => value.toUpperCase()),
      tap((value) => console.log(value)),
      finalize(() => console.log('Stream finished!!'))
    );
  }

  // service.lastElementEmitted$.pipe()
  // service.elementEmitted$ => .pipe() - idzie do componentu żeby zrobić z niego lastElementEmitted$
}
