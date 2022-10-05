import { ProductInterface } from './../models/ProductInterface';
import { Injectable } from '@angular/core';
import { of, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockProductDataService {
  date = new Date();

  private productListSubject$ = new ReplaySubject<ProductInterface[]>();

  readonly products$ = this.productListSubject$.asObservable();

  weghtedBelt: ProductInterface = {
    id: 1,
    name: 'Weighted belt',
    description: 'Good for weighted pull ups and dips',
    lastModificationDate: this.date,
    availableInStock: true,
  };

  chalk: ProductInterface = {
    id: 2,
    name: 'Chalk',
    description: 'Greatly increases your grip',
    lastModificationDate: this.date,
    availableInStock: true,
  };

  boxingBag: ProductInterface = {
    id: 3,
    name: 'Heavy bag',
    description: 'Great for unloading your frustration!',
    lastModificationDate: this.date,
    availableInStock: false,
  };

  jumpRope: ProductInterface = {
    id: 4,
    name: 'Fairtex heavy jump rope',
    description: 'Great for conditioning, coordination and strong arms',
    lastModificationDate: this.date,
    availableInStock: true,
  };

  slipBag: ProductInterface = {
    id: 5,
    name: 'Slip bag',
    description: 'Wanna fight like Mike Tyson? Slip bag is your choice!',
    lastModificationDate: this.date,
    availableInStock: false,
  };

  productList = [
    this.weghtedBelt,
    this.chalk,
    this.boxingBag,
    this.jumpRope,
    this.slipBag,
  ];

  constructor() {}

  getProductList() {
    this.productListSubject$.next(this.productList);
    // return of(this.productList);
    // return this.productList
    // return this
  }

  updateProductList(productList: ProductInterface[]) {
    this.productList = productList;
    this.productListSubject$.next(this.productList);
  }

  private getProductIndex(productId: number) {
    return this.productList.findIndex((product) => product.id === productId);
  }

  removeProduct(productId: number) {
    const productIndex = this.getProductIndex(productId);

    this.productList.splice(productIndex, 1);
    this.productListSubject$.next(this.productList);
  }
}
