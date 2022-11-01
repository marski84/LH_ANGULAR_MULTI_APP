import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { DisplayComponent } from './display/display.component';
import { JokesFormContainerComponent } from './jokes-form-container/jokes-form-container.component';
import { JokesFormComponent } from './jokes-form/jokes-form.component';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetworkInterceptor } from './jokes-form-container/network.interceptor';

const modules = [
  JokesFormComponent,
  JokesFormContainerComponent,
  DisplayComponent,
];

@NgModule({
  declarations: [[...modules]],

  imports: [CommonModule, MaterialModule, ReactiveFormsModule, SharedModule],
  exports: [[...modules], MaterialModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true },
  ],
})
export class JokesModule {}
