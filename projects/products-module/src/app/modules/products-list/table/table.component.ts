import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TableColumn } from '../models/TableColumn.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductComponent } from '../product/product.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns!: string[];

  @Input() set data(data: any) {
    this.setTableDataSoure(data);
  }
  @Input() tableColumns!: TableColumn[];
  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() pageSizeOptions = [5, 10, 15, 20];

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

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.displayedColumns = this.tableColumns.map(
      (tableColumn) => tableColumn.name
    );
  }

  ngAfterViewInit(): void {}

  sortTableData(sortDirection: any) {}

  handleEdit(row: any) {
    this.dialog.open(ProductComponent, this.dialogConfig);
  }

  onNewProductInit() {
    // this.dialogConfig.data = true;

    console.log('ok');
    this.dialog.open(ProductComponent, this.dialogConfig);
  }
}
