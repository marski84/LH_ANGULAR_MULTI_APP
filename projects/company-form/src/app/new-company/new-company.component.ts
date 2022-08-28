import { Component, OnInit, ViewChild } from '@angular/core';
import { Company } from '../models/Company';
import { CompanyService } from '../services/company.service';
import { CompanyFormComponent } from '../company-form/company-form.component';
import { IDeactivableComponent } from '../models/IDeactivableComponent';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.scss'],
})
export class NewCompanyComponent implements OnInit, IDeactivableComponent {
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
