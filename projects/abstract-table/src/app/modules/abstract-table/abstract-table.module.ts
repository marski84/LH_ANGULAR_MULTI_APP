import { MatSortModule } from '@angular/material/sort';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractTableComponent } from './abstract-table/abstract-table.component';
import { TableItemEditFormComponent } from './abstract-table/table-item-edit-form/table-item-edit-form.component';
import { DataKeyPipe } from './abstract-table/pipes/data-key.pipe';
import { MaterialModule } from '../material/material.module';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AbstractTableComponent,
    TableItemEditFormComponent,
    DataKeyPipe,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
  ],
})
export class AbstractTableModule {}
