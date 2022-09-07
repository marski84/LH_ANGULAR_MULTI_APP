import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMatInputComponent } from './custom-mat-input/custom-mat-input.component';
import { CustomMatSelectComponent } from './custom-mat-select/custom-mat-select.component';
import { CustomMatSpinnerComponent } from './custom-mat-spinner/custom-mat-spinner.component';

@NgModule({
  declarations: [CustomMatInputComponent, CustomMatSelectComponent, CustomMatSpinnerComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule, CustomMatInputComponent, CustomMatSelectComponent],

  providers: [],
})
export class SharedModule {}
