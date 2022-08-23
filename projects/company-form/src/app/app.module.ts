import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyContainerComponent } from './company-container/company-container.component';
import { NewCompanyComponent } from './new-company/new-company.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './dialog-component/dialog/dialog.component';
import { MaterialModule } from '../../../modules/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    CompanyContainerComponent,
    NewCompanyComponent,
    EditCompanyComponent,
    CompanyFormComponent,
    EmployeeFormComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
