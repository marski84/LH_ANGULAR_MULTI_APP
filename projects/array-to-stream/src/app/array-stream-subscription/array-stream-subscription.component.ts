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
    // this.arrayService.arrayStreamEmitted$
    //   .pipe(
    //     skip(2),
    //     concatMap((value) =>
    //       concat(
    //         // of(value).pipe(map((value) => value)),
    //         of(value)
    //           .pipe(tap((value) => value))
    //           .pipe(map((value) => value.toUpperCase()))
    //       ).pipe(delay(2000))
    //     ),
    //     finalize(() => console.log('ended'))
    //   )
    //   .subscribe((value) => console.log(value));

    this.arrayService.arrayStream$.pipe(
      skip(2),
      tap((value) => console.log(value)),
      map((value) => value.toUpperCase()),
      tap((value) => console.log(value)),
      finalize(() => console.log('Stream finished!!'))
    );
    // .subscribe();

    // of('hound', 'mastiff', 'retriever') //outer observable
    //   .pipe(
    //     concatMap((breed) => {
    //       const url = 'https://dog.ceo/api/breed/' + breed + '/list';
    //       return this.http.get<any>(url); //inner observable
    //     })
    //   );
    // .subscribe((data) => {
    //   console.log(data);
    // });
  }

  // service.lastElementEmitted$.pipe()
  // service.elementEmitted$ => .pipe() - idzie do componentu żeby zrobić z niego lastElementEmitted$
}
