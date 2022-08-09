import { ProductColumnsDef } from './../models/ProductColumnsDef';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-abstract-table',
  templateUrl: './abstract-table.component.html',
  styleUrls: ['./abstract-table.component.scss'],
})

// * Przyjmuje tablice obiektów i wyświetla je w formie tabelki
// * Obsługuje takie dane w obiekcie jak string, number, boolean, data.
// * Przy każdym row posiada wbudowane przyciski takie jak remove oraz edit które emitują zdarzenia do parenta.
// * Przyjmuje od parenta opcjonalne customowe button'y które są wyświetlane na początku lub końcu każdego z item'ów tabelki(content projection).
export class AbstractTableComponent implements OnInit {
  matPaginator: any;
  matSort: any;

  @Input() tableColumnsDefinition: any;

  @Input() set tableData(data: {}[]) {
    this.setTableDataSource(data);
  }

  columnsToDisplay!: string[];

  tableDataSource = new MatTableDataSource<Array<{}>>([]);

  constructor() {}

  ngOnInit(): void {
    const columnNames = this.tableColumnsDefinition.map(
      (column: ProductColumnsDef) => column.name
    );
    this.columnsToDisplay = columnNames;

    console.log(this.tableDataSource);
    console.log(this.tableColumnsDefinition);
  }

  setTableDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource<Array<{}>>(data);
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
  }
}
