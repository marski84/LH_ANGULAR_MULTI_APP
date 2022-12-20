import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Output,
} from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TableColumn } from '../models/TableColumn.interface';
import { ProductApiService } from '../product-api.service';
import { map, tap, filter, Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { EventEmitter, OnDestroy } from '@angular/core';
import { IModifiedProductApiResponse } from '../models/modifiedApiReponse.interface';
import { AddProductComponent } from '../product/add-product/add-product.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns!: string[];
  private onDestroy$: Subject<void> = new Subject<void>();

  @Output() sortDataEmitted = new EventEmitter<Sort>();

  tableColumns: TableColumn[] = [
    {
      name: 'Product id',
      dataKey: 'id',
      isSortable: true,
      position: 'right',
    },
    {
      name: 'Title',
      dataKey: 'title',
      position: 'left',
    },
    {
      name: 'Price',
      dataKey: 'price',
      position: 'right',
    },
    {
      name: 'Product description',
      dataKey: 'description',
    },
    {
      name: 'Category',
      dataKey: 'category',
      position: 'right',
    },
    // {
    //   name: 'Image',
    //   dataKey: 'image',
    // },
    {
      name: 'Product rating',
      dataKey: 'rate',
    },
    {
      name: 'Amount of opinions',
      dataKey: 'count',
    },

    { name: 'Edit', dataKey: 'edit' },
  ];

  pageSizeOptions = [5, 10, 15, 20];

  dialogConfig: MatDialogConfig = {
    autoFocus: true,
    closeOnNavigation: false,
    hasBackdrop: true,
    disableClose: false,
  };

  constructor(
    private productService: ProductApiService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.displayedColumns = this.tableColumns.map(
      (tableColumn) => tableColumn.name
    );
    this.productService
      .getProductsData()
      .pipe(
        takeUntil(this.onDestroy$),
        map((productList) => this.setTableDataSoure(productList)),
        tap(() => this.toastr.info('Succesfully retrieved data!', 'Success!'))
        // error handling implemented in network interceptor
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  setTableDataSoure(data: IModifiedProductApiResponse[]) {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  sortTableData(sortParameters: Sort) {
    this.productService.getProducts(sortParameters.direction);
  }

  onNewProductInit() {
    const dialogRef = this.dialog.open(AddProductComponent, this.dialogConfig);

    dialogRef
      .afterClosed()
      .pipe(
        filter((data) => !!data),
        map((data) => this.onNewProductAdd(data)),
        tap((data) => console.log(data))
      )
      .subscribe();
  }

  private onNewProductAdd(formData: IModifiedProductApiResponse) {
    return this.productService
      .addNewProduct(formData)
      .pipe(
        map((data) => data.id),
        tap((newProductId) =>
          this.toastr.success(
            `New product id: ${newProductId}`,
            'New product Added!'
          )
        )
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
