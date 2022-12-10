import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {
    return;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes('fakestoreapi.com')) {
      return next.handle(request).pipe(
        catchError((err) => {
          this.toastr.error(
            'We encountered a problem while fething data',
            'Ooops!'
          );
          return of(err);
        })
      );
    }
    return next.handle(request);
  }
}
