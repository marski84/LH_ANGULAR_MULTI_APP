import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { DisplayComponent } from './display/display.component';
import { JokesFormContainerComponent } from './jokes-form-container/jokes-form-container.component';
import { JokesFormComponent } from './jokes-form/jokes-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    JokesFormComponent,
    JokesFormContainerComponent,
    DisplayComponent,
  ],

  imports: [CommonModule, MaterialModule, ReactiveFormsModule, SharedModule],
  exports: [
    JokesFormComponent,
    JokesFormContainerComponent,
    DisplayComponent,
    MaterialModule,
  ],
})
export class JokesModule {}
