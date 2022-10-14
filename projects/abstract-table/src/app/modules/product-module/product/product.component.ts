import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ContentChild,
  ChangeDetectorRef,
} from '@angular/core';
import { first, Subject, takeUntil } from 'rxjs';
import { MatTable } from '@angular/material/table';
import { ProductInterface } from '../models/ProductInterface';
import { MockProductDataService } from '../../../services/mock-product-data.service';
import { TableColumn } from '../models/TableColumn';
import { Sort } from '@angular/material/sort';
import { AbstractTableComponent } from '../../abstract-table-module/abstract-table-component/abstract-table.component';

@Component({
  selector: 'app-product-module',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  products!: ProductInterface[];

  @ViewChild('abstractTable', { static: false })
  abstractTable!: AbstractTableComponent;

  // @ViewChild(MatTable, { static: false }) abstractTable!: MatTable<any>;

  // @ContentChild('abstractTable', { static: true })
  // abstractTable!: MatTable<ProductInterface>;

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
      isSortable: true,
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

  constructor(
    private dataService: MockProductDataService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataService.getProductList();

    this.dataService.products$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((productList) => {
        console.log('updated');
        console.log(productList);

        this.products = productList;
      });
  }

  handleRowDelete(productId: number) {
    this.dataService.removeProduct(productId);
    this.abstractTable.refreshData();
  }

  handleRowEdit(dataAfterEdit: ProductInterface) {
    this.dataService.updateProduct(dataAfterEdit);
    this.abstractTable.refreshData();
  }

  handleSort(sortParameters: Sort) {
    console.log(sortParameters);
    console.log(this.products);

    const keyName = sortParameters.active as string;
    console.log(keyName);
    this.products.sort((a: ProductInterface, b: ProductInterface) =>
      a[keyName as keyof ProductInterface]
        .toLocaleString()
        .localeCompare(b[keyName as keyof ProductInterface].toLocaleString())
    );
    this.abstractTable.refreshData();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
