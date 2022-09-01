import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMatInputComponent } from './custom-mat-input/custom-mat-input.component';
import { CustomMatSelectComponent } from './custom-mat-select/custom-mat-select.component';

@NgModule({
  declarations: [CustomMatInputComponent, CustomMatSelectComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule, CustomMatInputComponent, CustomMatSelectComponent],

  providers: [],
})
export class SharedModule {}
