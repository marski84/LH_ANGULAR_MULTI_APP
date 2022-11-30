import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule, MaterialModule, SharedModule],
  exports: [ProductComponent],
})
export class ProductModule {}
