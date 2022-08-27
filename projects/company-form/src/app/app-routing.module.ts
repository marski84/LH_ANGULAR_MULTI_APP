import { CanDeactiveFormService } from './services/can-deactive-form.service';
import { NgModule } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterModule,
  RouterStateSnapshot,
  Routes,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyContainerComponent } from './company-container/company-container.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { NewCompanyComponent } from './new-company/new-company.component';
import { FormGroup } from '@angular/forms';

// IDeactivableComponent
export interface CanDeactivateRoute {
  isDataSaved(): boolean; //canBeLeft
}

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: 'registerNewCompany',
    component: NewCompanyComponent,
    canDeactivate: [CanDeactiveFormService],
  },

  {
    path: 'editCompany/:id',
    component: EditCompanyComponent,
    canDeactivate: [CanDeactiveFormService],
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
