import { TableColumn } from './../models/TableColumn';
import { Component, OnInit } from '@angular/core';
import { MockProductDataService } from '../services/mock-product-data.service';
import { ProductInterface } from '../models/ProductInterface';
import { first } from 'rxjs';

@Component({
  selector: 'app-product-module',
  templateUrl: './product-module.component.html',
  styleUrls: ['./product-module.component.scss'],
})
export class ProductModuleComponent implements OnInit {
  products!: ProductInterface[];

  productColumnsDef: TableColumn[] = [
    {
      name: 'Product name',
      dataKey: 'name',
      isSortable: true,
    },
    {
      name: 'Short product description',
      dataKey: 'description',
    },
    {
      name: 'Product availability status date',
      dataKey: 'lastModificationDate',
    },
    {
      name: 'Available?',
      dataKey: 'availableInStock',
    },
  ];

  // name: string;
  // description: string;
  // lastModificationDate: Date;
  // availableInStock: boolean;

  constructor(private dataService: MockProductDataService) {}

  ngOnInit(): void {
    this.dataService
      .getProductList()
      .pipe()
      .subscribe((productList) => (this.products = productList));
  }

  breakStuff(event: Event) {
    console.log(event);
  }
}
