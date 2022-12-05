import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, EMPTY, map, Observable, of, tap } from 'rxjs';
import { ProductApiService } from './product-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<boolean> {
  constructor(
    private productService: ProductApiService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.productService.getProduct(route.params?.['id']).pipe(
      map((value) => value),
      catchError((error) => {
        this.router.navigate(['']);
        return EMPTY;
      })
    );
    // console.log('resolver');

    // return of('');
  }
}
