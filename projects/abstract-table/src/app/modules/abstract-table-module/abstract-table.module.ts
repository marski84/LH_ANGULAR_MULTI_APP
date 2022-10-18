import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractTableComponent } from './abstract-table-component/abstract-table.component';
import { TableItemEditFormComponent } from './abstract-table-component/table-item-edit-form/table-item-edit-form.component';
import { DataKeyPipe } from './abstract-table-component/pipes/data-key.pipe';
import { MaterialModule } from '../material/material.module';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

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
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  exports: [
    AbstractTableComponent,
    DataKeyPipe,
    TableItemEditFormComponent,
  ],
})
export class AbstractTableModule {}
