import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Company } from './models/Company';
import { Employee } from './models/Employee';
import { IEmployee } from './models/IEmployee';
import { ICompany } from './models/ICompany';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  companyList!: Company[];

  constructor(private dataService: DataService) {
    this.companyList = this.dataService.companyList;
  }

  private _selectedCompany!: Company;

  set selectedCompany(companyIndex: number) {
    this._selectedCompany = this.companyList[companyIndex];
  }

  get selectedCompanyValue() {
    console.log(this._selectedCompany);

    return this._selectedCompany;
  }

  getCompanyList() {
    return of(this.companyList);
  }

  getCompanyByIndex(companyIndex: number) {
    return this.companyList[companyIndex];
  }

  createNewCompany(formData: ICompany) {
    console.log(formData);

    const { name, typeOfBusiness, companyEmployees } = formData;
    const company = new Company(name, typeOfBusiness, companyEmployees);
    this.companyList.push(company);
    console.log(this.companyList);
  }

  addEmployeeToEmployeeList(company: Company, employeeData: IEmployee) {
    company.addNewEmployeeData(employeeData);
  }

  editCompanyData(companyEditedData: ICompany) {
    this._selectedCompany.editCompanyData(companyEditedData);
    console.log(this.companyList);
  }
}
