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
import { AdressFormComponent } from './adress-form/adress-form.component';
import { EmailComponent } from './email/email.component';
import { PhoneFormComponent } from './phone-form/phone-form.component';
import { NewContactComponent } from './new-contact/new-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ViewValuePipe } from './view-value.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    ContactComponent,
    ContactFormComponent,
    AdressFormComponent,
    EmailComponent,
    PhoneFormComponent,
    NewContactComponent,
    EditContactComponent,
    ViewValuePipe,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
