import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, EMPTY, Observable, of, tap } from 'rxjs';
import { ProductApiService } from './product-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<boolean> {
  constructor(private productService: ProductApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    console.log(route);

    return this.productService.getProduct(route.params?.['id']).pipe(
      tap((value) => console.log('ok resolver')),
      catchError((error) => {
        // this.router.navigate(['']);
        return EMPTY;
      })
    );
    // console.log('resolver');

    // return of('');
  }
}
