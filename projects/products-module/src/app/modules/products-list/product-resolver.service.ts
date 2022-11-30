import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';
import { Resolve } from './models/resolve.interface';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class ProductResolverService implements Resolve<any> {
  constructor(private productService: ProductsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    console.log('Called Get Product in resolver...', route);
    return this.productService.getProducts().pipe(
      tap((value) => console.log(value)),

      catchError((error) => {
        return of('No data');
      })
    );
  }
}
