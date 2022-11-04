import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayComponent } from './display/display.component';
import { JokesFormContainerComponent } from './jokes-form-container/jokes-form-container.component';
import { JokesFormComponent } from './jokes-form/jokes-form.component';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetworkInterceptor } from './jokes-form-container/network.interceptor';

const components = [
  JokesFormComponent,
  JokesFormContainerComponent,
  DisplayComponent,
];

@NgModule({
  declarations: [...components],
  imports: [ReactiveFormsModule, SharedModule],
  exports: [JokesFormContainerComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true },
  ],
})
export class JokesModule {}
