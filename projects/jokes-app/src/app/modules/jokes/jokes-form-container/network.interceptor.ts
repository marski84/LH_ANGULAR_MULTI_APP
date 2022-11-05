import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {
  Observable,
  finalize,
  debounceTime,
  of,
  concatMap,
  tap,
  switchMap,
  delay,
  map,
  mergeMap,
  distinctUntilChanged,
} from 'rxjs';
import { CustomMatSpinnerService } from '../../shared/custom-mat-spinner/custom-mat-spinner.service';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
  private count = 0;
  constructor(private spinnerService: CustomMatSpinnerService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.count === 0) {
      this.count++;
      this.spinnerService.show();
    }

    // of(request)
    //   .pipe(debounceTime(5000))
    //   .pipe(
    //     map((request) => {
    //       return next.handle(request).pipe(
    //         map((request) => of(request)),
    //         finalize(() => this.spinnerService.hide())
    //       );
    //     })
    //   );

    return next.handle(request).pipe(
      switchMap((request) => of(request).pipe(debounceTime(500))),
      finalize(() => {
        this.count--;
        if (this.count === 0) {
          this.spinnerService.hide();
        }
      })
    );
  }
}
