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
import { TableColumn } from '../TableColumn';

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
    console.log(data);

    this.setTableDataSoure(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  @Output() sortData: EventEmitter<any> = new EventEmitter();
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowDataDeleted: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowDataEdited: EventEmitter<any> = new EventEmitter<any>();

  // https://tomaszs2.medium.com/dead-simple-content-projection-in-angular-f5969c675003

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    console.log(this.tableColumns);

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
      });
    }
  }

  setTableDataSoure(data: any) {
    this.dataSource = new MatTableDataSource<any>(data);
  }

  sortTableData(sortParameters: Sort) {
    console.log(sortParameters);
    sortParameters.active = this.data.find(
      (column: any) => column.name === sortParameters.active
    );

    console.log();

    this.sortData.emit(sortParameters);
  }

  private refreshData() {
    this.data = this.dataSource.data;
  }

  removeItem(elementId: number) {
    const indexInData = this.dataSource.data.findIndex(
      (data) => data.id === elementId
    );
    this.rowDataDeleted.emit(this.dataSource.data);
    this.dataSource.data.splice(indexInData, 1);
    this.refreshData();
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
      .subscribe((result: { event: { id: number } }) => {
        if (result.event) {
          const editedData = result.event;

          const indexInData = this.dataSource.data.findIndex(
            (data) => data.id === editedData.id
          );

          console.log(indexInData);
          this.dataSource.data[0] = editedData;
          this.rowDataEdited.emit(this.dataSource.data);
          this.refreshData();
        }
      });
  }
}
