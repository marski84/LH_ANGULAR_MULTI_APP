import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMatInputComponent } from './custom-mat-input/custom-mat-input.component';
import { CustomMatSelectComponent } from './custom-mat-select/custom-mat-select.component';

import { CustomNipInputComponent } from './custom-nip-input/custom-nip-input.component';
import { ViewValuePipePipe } from './custom-mat-select/view-value-pipe.pipe';
import { CustomMatSpinnerComponent } from './custom-mat-spinner/custom-mat-spinner.component';
const modules = [
  CustomMatInputComponent,
  CustomMatSelectComponent,
  CustomNipInputComponent,
  ViewValuePipePipe,
  CustomMatSpinnerComponent,
];
@NgModule({
  declarations: [[...modules]],
  imports: [CommonModule, MaterialModule],
  exports: [[...modules]],

  providers: [],
})
export class SharedModule {}
