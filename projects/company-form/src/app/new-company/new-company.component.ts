import { CanDeactivateRoute } from './../app-routing.module';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Company } from '../models/Company';
import { CompanyService } from '../services/company.service';
import { CompanyFormComponent } from '../company-form/company-form.component';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.scss'],
})
export class NewCompanyComponent implements OnInit, CanDeactivateRoute {
  constructor(private companyService: CompanyService) {}

  @ViewChild(CompanyFormComponent) newCompanyForm!: CompanyFormComponent;

  ngOnInit(): void {}

  handleAddNewCompany(data: Company) {
    this.companyService.createNewCompany(data);
  }

  isDataSaved(): boolean {
    return !(
      this.newCompanyForm.companyForm.touched &&
      this.newCompanyForm.companyForm.dirty
    );
  }
}
