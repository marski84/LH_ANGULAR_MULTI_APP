import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { IModifiedProductApiResponse } from 'projects/products-module/src/app/modules/products-list/models/modifiedApiReponse.interface';
import { catchError, EMPTY, map, Observable, of, tap } from 'rxjs';
import { ProductApiService } from './product-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<IModifiedProductApiResponse> {
  constructor(
    private productService: ProductApiService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<IModifiedProductApiResponse> {
    return this.productService.getProductData(route.params?.['id']).pipe(
      // error handling implemented in network interceptor
      catchError((error) => {
        this.router.navigate(['']);
        return EMPTY;
      })
    );
  }
}
