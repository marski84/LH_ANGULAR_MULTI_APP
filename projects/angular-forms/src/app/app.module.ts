import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormContainerComponent } from './form-container/form-container.component';
import { EditProfileDataFormComponent } from './edit-profile-data-form/edit-profile-data-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'projects/modules/shared/shared.module';
import { DataPreviewComponent } from './data-preview/data-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    FormContainerComponent,
    EditProfileDataFormComponent,
    DataPreviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
