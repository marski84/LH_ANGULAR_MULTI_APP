import { Component, OnInit } from '@angular/core';
import { MockProductDataService } from '../../services/mock-product-data.service';
import { ProductInterface } from '../../models/ProductInterface';
import { first } from 'rxjs';

@Component({
  selector: 'app-product-module',
  templateUrl: './product-module.component.html',
  styleUrls: ['./product-module.component.scss'],
})
export class ProductModuleComponent implements OnInit {
  products!: ProductInterface[];

  constructor(private dataService: MockProductDataService) {}

  ngOnInit(): void {
    this.dataService
      .getProductList()
      .pipe(first())
      .subscribe((productList) => (this.products = productList));
  }
}
