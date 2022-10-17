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
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TableItemEditFormComponent } from './table-item-edit-form/table-item-edit-form.component';
import { TableColumn } from '../models/TableColumn';
import { filter, map, tap } from 'rxjs';

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
  @ContentChildren(MatColumnDef, {}) columnDefs?: QueryList<MatColumnDef>;
  // @ContentChild() dupa: any;

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns!: string[];
  itemEditDialogRef?: MatDialogRef<TableItemEditFormComponent>;

  @Input() editButton: string = '';
  @Input() removeButton: string = '';
  @Input() additionalColumns: string[] = [];
  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;

  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[1];
  @Input() tableColumns!: TableColumn[];

  @Input() set data(data: any) {
    console.log('input data:');
    console.log(data);

    this.setTableDataSoure(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  @Output() sortDataEmitted: EventEmitter<any> = new EventEmitter();
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowDataDeleted: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowDataEdited: EventEmitter<any> = new EventEmitter<any>();

  // https://tomaszs2.medium.com/dead-simple-content-projection-in-angular-f5969c675003

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    const columnNames = this.tableColumns.map((column) => column.name);

    if (this.editButton && this.removeButton) {
      this.displayedColumns = [
        ...columnNames,
        this.editButton,
        this.removeButton,
      ];
    } else if (this.editButton) {
      this.displayedColumns = [...columnNames, this.editButton];
    } else if (this.removeButton) {
      this.displayedColumns = [...columnNames, this.removeButton];
    } else {
      this.displayedColumns = columnNames;
    }

    console.log(this.additionalColumns);
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngAfterContentInit(): void {
    console.log('tutaj:');

    console.log(this.columnDefs);
    // console.log(this.dupa);

    if (this.columnDefs) {
      this.columnDefs.forEach((columnDef: CdkColumnDef) => {
        this.table.addColumnDef(columnDef);
        this.displayedColumns.push(columnDef.name);
      });
    }
  }

  setTableDataSoure(data: any) {
    this.dataSource = new MatTableDataSource<any>(data);
  }

  sortTableData(sortParameters: Sort) {
    sortParameters.active = this.tableColumns.find(
      (column) => column.name === sortParameters.active
    )!.dataKey;
    this.sortDataEmitted.emit(sortParameters);
  }

  refreshData() {
    this.data = this.dataSource.data;
  }

  removeItem(elementId: number) {
    this.rowDataDeleted.emit(elementId);
  }

  editItem(element: any) {
    this.itemEditDialogRef = this.dialog.open(TableItemEditFormComponent, {
      minHeight: '800px',
      minWidth: '500px',
      data: {
        elementId: element,
      },
    });

    this.itemEditDialogRef
      .afterClosed()
      .pipe(
        filter((result) => result.event),
        map((value: any) => this.handleEditDataEmission(value))
      )
      .subscribe();
  }

  private handleEditDataEmission<T extends { id: number }>(data: { event: T }) {
    const editedData = data.event;

    this.rowDataEdited.emit(editedData);
  }
}
