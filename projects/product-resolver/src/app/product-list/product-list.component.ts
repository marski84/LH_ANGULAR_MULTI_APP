import {
  Component,
  Input,
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
import { ProductComponent } from '../product/product.component';
import { ProductApiService } from '../product-api.service';
import { map, catchError, EMPTY, of, tap, filter } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { EventEmitter } from '@angular/core';
import { IModifiedProductApiResponse } from '../models/modifiedApiReponse.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns!: string[];

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
      isSortable: true,
      position: 'right',
    },
    {
      name: 'Price',
      dataKey: 'price',
      isSortable: true,
      position: 'right',
    },
    {
      name: 'Product description',
      dataKey: 'description',
    },
    {
      name: 'Category',
      dataKey: 'category',
      isSortable: true,
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

  setTableDataSoure(data: any) {
    console.log(data);

    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.dataSource.paginator
  }

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
        map((productList) => this.setTableDataSoure(productList)),
        tap(() => this.toastr.info('Succesfully retrieved data!', 'Success!')),
        catchError((error) => {
          this.toastr.error(
            'Error while trying to retrieve data!',
            'Http Error'
          );
          return of(EMPTY);
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  sortTableData(sortParameters: Sort) {
    sortParameters.active = this.tableColumns.find(
      (column) => column.name === sortParameters.active
    )!.dataKey;

    this.sortDataEmitted.emit(sortParameters);
    return;
  }

  onNewProductInit() {
    const dialogRef = this.dialog.open(ProductComponent, this.dialogConfig);

    dialogRef
      .afterClosed()
      .pipe(
        filter((data) => data !== undefined),
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

  private onProductEdit(editedProductData: IModifiedProductApiResponse) {
    return this.productService.editProduct(editedProductData);
  }
}
