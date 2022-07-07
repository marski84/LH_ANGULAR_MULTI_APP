import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyContainerComponent } from './company-container/company-container.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { NewCompanyComponent } from './new-company/new-company.component';

const routes: Routes = [
  { path: 'registerNewCompany', component: NewCompanyComponent },
  {
    path: 'registerCompany',
    component: CompanyFormComponent,
  },
  {
    path: 'editCompany/:id',
    component: EditCompanyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
