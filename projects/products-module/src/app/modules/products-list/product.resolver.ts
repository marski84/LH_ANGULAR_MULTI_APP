import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, Observable, of, EMPTY, tap } from 'rxjs';
import { IModifiedProductApiResponse } from './models/modifiedApiReponse.interface';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<any> {
  constructor(private productService: ProductsService, private router: Router) {
    console.log('resolver constructor');
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    console.log(route);

    // return this.productService.getProduct(route.params?.['id']).pipe(
    //   tap((value) => console.log('ok resolver')),
    //   catchError((error) => {
    //     // this.router.navigate(['']);
    //     return EMPTY;
    //   })
    // );
    console.log('resolver');

    return of('');
  }
}
