import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TableColumn } from '../models/TableColumn.interface';
import { ProductComponent } from '../product/product.component';
import { ProductApiService } from '../product-api.service';
import { map, catchError, EMPTY, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns!: string[];

  // @Input() set data(data: any) {
  //   this.setTableDataSoure(data);
  // }
  // @Input() tableColumns!: TableColumn[];

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

    // this.productService.getProducts().subscribe();

    this.productService.productDataReplaySubject$
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

  ngAfterViewInit(): void {}

  sortTableData(sortDirection: any) {}

  onNewProductInit() {
    // this.dialogConfig.data = true;

    console.log('ok');
    this.dialog.open(ProductComponent, this.dialogConfig);
  }
}
