import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Company } from './models/Company';
import { Employee } from './models/Employee';
import { IEmployee } from './models/IEmployee';
import { ICompany } from './models/ICompany';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  first = new Company('firstOne', 'Partnership', [
    new Employee('second', 'secondary', 29),
    new Employee('fdsg', 'fd', 30),
  ]);

  second = new Company('second', 'Partnership', [
    new Employee('second', 'secondary', 40),
    new Employee('hiper', 'piper', 20),
  ]);

  third = new Company('third', 'Partnership', [
    new Employee('super', 'duper', 40),
    new Employee('hiper', 'piper', 20),
  ]);

  public companyList = [this.first, this.second, this.third];

  constructor() {}
  getCompanyList() {
    return of(this.companyList);
  }

  private _selectedCompany!: Company;

  set setSelectedCompany(companyIndex: number) {
    this._selectedCompany = this.companyList[companyIndex];
  }

  get getSelectedCompany() {
    return this._selectedCompany;
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
