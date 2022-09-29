import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { JokesFormContainerComponent } from './jokes-form-container/jokes-form-container.component';
import { JokesFormComponent } from './jokes-form/jokes-form.component';
import { DisplayComponent } from './display/display.component';

@NgModule({
  declarations: [			
    AppComponent,
      ContainerComponent,
      JokesFormContainerComponent,
      JokesFormComponent,
      DisplayComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
