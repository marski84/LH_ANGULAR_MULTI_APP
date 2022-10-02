import { ProductInterface } from './../models/ProductInterface';
import { TableColumn } from './../models/TableColumn';
import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  OnInit,
  EventEmitter,
  Output,
  AfterContentInit,
  ContentChildren,
  QueryList,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import {
  MatColumnDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';

import { CdkColumnDef } from '@angular/cdk/table';

export interface ViewContext<T> {
  $implicit: T;
}

@Component({
  selector: 'app-abstract-table',
  templateUrl: './abstract-table.component.html',
  styleUrls: ['./abstract-table.component.scss'],
})
export class AbstractTableComponent
  implements OnInit, AfterViewInit, AfterContentInit
{
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  @ContentChildren(MatColumnDef) columnDefs?: QueryList<MatColumnDef>;

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns!: string[];

  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() rowActionIcon?: string;
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[1];
  @Input() tableColumns!: TableColumn[];

  // @Input() set tableColumns(columnsData: TableColumn[]) {}
  @Input() set data(data: any) {
    this.setTableDataSoure(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  @Output() sortData: EventEmitter<any> = new EventEmitter();
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();

  // https://tomaszs2.medium.com/dead-simple-content-projection-in-angular-f5969c675003

  constructor() {}

  ngOnInit(): void {
    console.log(this.tableColumns);

    const columnNames = this.tableColumns.map((column) => column.name);
    if (this.rowActionIcon) {
      this.displayedColumns = [this.rowActionIcon, ...columnNames];
      console.log(this.displayedColumns);
    } else {
      this.displayedColumns = columnNames;
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngAfterContentInit(): void {
    console.log(this.columnDefs);

    if (this.columnDefs) {
      this.columnDefs.forEach((columnDef: CdkColumnDef) => {
        this.table.addColumnDef(columnDef);
        this.displayedColumns.push(columnDef.name);
        console.log(this.table);
      });
    }
  }

  setTableDataSoure(data: any) {
    this.dataSource = new MatTableDataSource<any>(data);
  }

  sortTableData(sortParameters: Sort) {
    console.log(sortParameters);
    sortParameters.active = this.data.find(
      (column: ProductInterface) => column.name === sortParameters.active
    );

    console.log();

    this.sortData.emit(sortParameters);
  }

  getContext(user: any): ViewContext<any> {
    return { $implicit: user };
  }
}
