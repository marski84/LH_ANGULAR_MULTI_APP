import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IModifiedProductApiResponse } from './models/modifiedApiReponse.interface';
import { ProductApiService } from './product-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductListResolver
  implements Resolve<IModifiedProductApiResponse[]>
{
  constructor(private productService: ProductApiService) {}

  resolve(): Observable<IModifiedProductApiResponse[]> {
    return this.productService.getProducts();
  }
}
