import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMatInputComponent } from './custom-mat-input/custom-mat-input.component';
import { CustomMatSelectComponent } from './custom-mat-select/custom-mat-select.component';
import { CustomMatSpinnerComponent } from './custom-mat-spinner/custom-mat-spinner.component';
import { CustomNipInputComponent } from './custom-nip-input/custom-nip-input.component';

@NgModule({
  declarations: [
    CustomMatInputComponent,
    CustomMatSelectComponent,
    CustomMatSpinnerComponent,
    CustomNipInputComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    MaterialModule,
    CustomMatInputComponent,
    CustomMatSelectComponent,
    CustomNipInputComponent,
    CustomMatSpinnerComponent,
  ],

  providers: [],
})
export class SharedModule {}
