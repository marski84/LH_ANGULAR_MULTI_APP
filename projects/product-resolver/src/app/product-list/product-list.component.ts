import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  @Output() sortDataEmitted = new EventEmitter<Sort>();

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns!: string[];
  private onDestroy$: Subject<void> = new Subject<void>();

  tableColumns: TableColumn[] = [];

  pageSizeOptions: number[] = [];

  constructor(
    private productService: ProductApiService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.tableColumns = this.productService.tableColumns;
    this.pageSizeOptions = this.productService.pageSizeOptions;
    this.displayedColumns = this.tableColumns.map(
      (tableColumn) => tableColumn.name
    );
    this.productService.products$
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
    this.productService.getProducts(sortParameters.direction).subscribe();
  }

  onNewProductInit() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      autoFocus: true,
      closeOnNavigation: false,
      hasBackdrop: true,
      disableClose: false,
    });

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
    return this.productService.addNewProduct(formData).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
