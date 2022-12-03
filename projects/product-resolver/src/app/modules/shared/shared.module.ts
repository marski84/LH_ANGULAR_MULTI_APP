import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMatInputComponent } from './custom-mat-input/custom-mat-input.component';
import { CustomMatSelectComponent } from './custom-mat-select/custom-mat-select.component';

import { CustomNipInputComponent } from './custom-nip-input/custom-nip-input.component';
import { ViewValuePipePipe } from './custom-mat-select/view-value-pipe.pipe';
import { CustomMatSpinnerComponent } from './custom-mat-spinner/custom-mat-spinner.component';
import { CustomMatRadioComponent } from './custom-mat-radio/custom-mat-radio.component';
import { MaterialModule } from './material/material.module';
const components = [
  CustomMatInputComponent,
  CustomMatSelectComponent,
  CustomNipInputComponent,
  ViewValuePipePipe,
  CustomMatSpinnerComponent,
  CustomMatRadioComponent,
];
@NgModule({
  declarations: [...components, CustomMatRadioComponent],
  imports: [MaterialModule, CommonModule],
  exports: [...components, CommonModule],

  providers: [],
})
export class SharedModule {}
