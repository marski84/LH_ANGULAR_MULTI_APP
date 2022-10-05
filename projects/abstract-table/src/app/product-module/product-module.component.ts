import { TableColumn } from './../models/TableColumn';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MockProductDataService } from '../services/mock-product-data.service';
import { ProductInterface } from '../models/ProductInterface';
import { first } from 'rxjs';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-product-module',
  templateUrl: './product-module.component.html',
  styleUrls: ['./product-module.component.scss'],
})
export class ProductModuleComponent implements OnInit {
  products!: ProductInterface[];

  @ViewChild(MatTable, { static: false }) abstractTable!: MatTable<any>;

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
    this.dataService.getProductList();

    this.dataService.products$.pipe().subscribe((productList) => {
      console.log(productList);

      this.products = productList;

      setTimeout(() => {
        console.log(this.products);
      }, 1000);
    });
  }

  handleRowDelete(dataAfterRemoval: ProductInterface[]) {
    this.dataService.updateProductList(dataAfterRemoval);
  }

  handleRowEdit(dataAfterRemoval: ProductInterface[]) {}

  removeProduct(productId: number) {
    // this.dataService.removeProduct(productId);
    // this.dataService.getProductList();
    // this.myTable.dataSource = this.products;
    console.log(this.abstractTable);
    this.abstractTable.renderRows();
  }
}
