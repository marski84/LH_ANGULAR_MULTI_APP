import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { ContactComponent } from './contact/contact.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatListModule } from '@angular/material/list';
import { ColorPickerModule } from 'ngx-color-picker';

import { SubmitButtonNamePipe } from './pipes/submit-button-name.pipe';
import { AdressFormComponent } from './contact-form/adress-form/adress-form.component';
import { ColorpickerFormComponent } from './contact-form/colorpicker-form/colorpicker-form.component';

import { EmailFormComponent } from './contact-form/email-form/email-form.component';
import { PhoneFormComponent } from './contact-form/phone-form/phone-form.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { NewContactComponent } from './new-contact/new-contact.component';
import { ViewValuePipe } from './pipes/view-value.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    ContactComponent,
    ContactFormComponent,
    AdressFormComponent,
    EmailFormComponent,
    PhoneFormComponent,
    NewContactComponent,
    EditContactComponent,
    ViewValuePipe,
    ColorpickerFormComponent,
    SubmitButtonNamePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatListModule,
    ColorPickerModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
