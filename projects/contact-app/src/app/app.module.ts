import { MessageDisplayValuePipe } from './pipes/message-display-value.pipe';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { ContactComponent } from './contact/contact.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { AdressFormComponent } from './contact-form/adress-form/adress-form.component';
import { ColorpickerFormComponent } from './contact-form/colorpicker-form/colorpicker-form.component';
import { EmailFormComponent } from './contact-form/email-form/email-form.component';
import { PhoneFormComponent } from './contact-form/phone-form/phone-form.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { NewContactComponent } from './new-contact/new-contact.component';
import { DispalyContactValue } from './pipes/display-contact-value.pipe';
import { MaterialModule } from '../../../modules/material/material.module';
import { SharedModule } from '../../../modules/shared/shared.module';
import { LoggerService } from 'projects/modules/shared/logger.service';
import { BetterLoggerService } from 'projects/modules/shared/better-logger.service';

function initApp() {
  return () => console.log('init');
}

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
    MaterialModule,
    ColorPickerModule,
    SharedModule,
  ],
  providers: [
    // LoggerService,
    // {
    // private: ovLoggerServic
    // useClass: LoggerService,
    // useFactory
    // useFactory =>czyuser jest adminem jeżeli tak to loguj do bazy jeżeli nie to do conosli
    // },
    // {
    // provide:jakis_klucz
    // useValue: wartość => true, 'adsasdads, 123
    // useValue => klucz do api
    // każdy komponent odwołuje się w constructorze
    // constructror(private klucz: jakis_klucz){}
    // },

    // LoggerService => BetterLoggerService => pamiętaj o zmianie folderu modules!
    { provide: LoggerService, useClass: BetterLoggerService },
    // { provide: APP_INITIALIZER, useFactory: initApp },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
