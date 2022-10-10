import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { first, Subject, takeUntil } from 'rxjs';
import { MatTable } from '@angular/material/table';
import { ProductInterface } from '../models/ProductInterface';
import { MockProductDataService } from '../../../services/mock-product-data.service';
import { TableColumn } from '../models/TableColumn';

@Component({
  selector: 'app-product-module',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  products!: ProductInterface[];

  @ViewChild(MatTable, { static: false }) abstractTable!: MatTable<any>;

  onDestroy$: Subject<void> = new Subject<void>();

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

  constructor(private dataService: MockProductDataService) {}

  ngOnInit(): void {
    this.dataService.getProductList();

    this.dataService.products$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((productList) => {
        this.products = productList;
      });
  }

  handleRowDelete(dataAfterRemoval: ProductInterface[]) {
    this.dataService.updateProductList(dataAfterRemoval);
  }

  handleRowEdit(dataAfterEdit: ProductInterface[]) {
    console.log('edited: ');
    console.log(dataAfterEdit);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
