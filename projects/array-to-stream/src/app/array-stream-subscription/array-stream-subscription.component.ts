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
} from 'rxjs';
import { ArrayToStreamService } from '../array-to-stream.service';

@Component({
  selector: 'app-array-stream-subscription',
  templateUrl: './array-stream-subscription.component.html',
  styleUrls: ['./array-stream-subscription.component.scss'],
})
export class ArrayStreamSubscriptionComponent implements OnInit {
  constructor(private arrayService: ArrayToStreamService) {}

  // this.arrayStream.getStringArray();
  // concat nie łączy w żaden sposób wartości w strumieniu a łączy strumienie
  // 0 0 0 0 0
  //     1 1 1
  // merge
  // 0 0 0 1 0 1 0 1

  // OUTPUT
  // 0 0 0 0 0 1 1 1

  // switch/merge/concat =>róznicach
  // switchMap/mergeMap/concatMap =>róznicach

  ngOnInit(): void {
    this.arrayService.arrayStreamEmitted$.pipe(
      skip(2),
      concatMap((value) =>
        concat(
          of(value).pipe(map((value) => value)),
          of(value).pipe(map((value) => value.toUpperCase()))
        ).pipe(delay(2000))
      ),
      finalize(() => console.log('ended'))
    );
    // .subscribe((value) => console.log(value));
  }

  // service.lastElementEmitted$.pipe()
  // service.elementEmitted$ => .pipe() - idzie do componentu żeby zrobić z niego lastElementEmitted$
}
