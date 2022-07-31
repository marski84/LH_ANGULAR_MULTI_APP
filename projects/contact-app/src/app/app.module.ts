import { MessageDisplayValuePipe } from './pipes/message-display-value.pipe';
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
import { AdressFormComponent } from './contact-form/adress-form/adress-form.component';
import { ColorpickerFormComponent } from './contact-form/colorpicker-form/colorpicker-form.component';
import { EmailFormComponent } from './contact-form/email-form/email-form.component';
import { PhoneFormComponent } from './contact-form/phone-form/phone-form.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { NewContactComponent } from './new-contact/new-contact.component';
import { DispalyContactValue } from './pipes/display-contact-value.pipe';

// TODO: wydzielić moduł materialowy jako MaterialModule i importować tutaj
// TODO: wydzielić moduł SharedModule i importować go w kazdym module
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
    DispalyContactValue,
    ColorpickerFormComponent,
    MessageDisplayValuePipe,
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
  providers: [
    // LoggerService,
    // {
    // privade: ovLoggerServic
    // useClass: LoggerService,
    // useFactory
    // useFactory =>czyuser jest adminem jeżeli tak to loguj do bazy jeżeli nie to do conosli
    // },
    // {
    // provia, // de:jakis_klucz
    // useValue: wartość => true, 'adsasdads, 123
    // useValue => klucz do api
    // każdy komponent odwołuje się w constructorze
    // constructror(private klucz: jakis_klucz){}
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
