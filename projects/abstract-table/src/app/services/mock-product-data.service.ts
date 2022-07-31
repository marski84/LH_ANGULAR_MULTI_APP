import { ProductInterface } from './../models/ProductInterface';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockProductDataService {
  date = new Date();

  weghtedBelt: ProductInterface = {
    name: 'Weighted belt',
    description: 'Good for weighted pull ups and dips',
    lastModificationDate: this.date,
    availableInStock: true,
  };

  chalk: ProductInterface = {
    name: 'Chalk',
    description: 'Greatly increases your grip',
    lastModificationDate: this.date,
    availableInStock: true,
  };

  boxingBag: ProductInterface = {
    name: 'Heavy bag',
    description: 'Great for unloading your frustration!',
    lastModificationDate: this.date,
    availableInStock: false,
  };

  jumpRope: ProductInterface = {
    name: 'Fairtex heavy jump rope',
    description: 'Great for conditioning, coordination and strong arms',
    lastModificationDate: this.date,
    availableInStock: true,
  };

  slipBag: ProductInterface = {
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
    return of(this.productList);
  }
}
