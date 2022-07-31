import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Company } from '../models/Company';
import { IEmployee } from '../models/IEmployee';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  companyList!: Company[];

  constructor(private dataService: DataService) {
    this.companyList = this.dataService.companyList;
  }

  getCompanyList() {
    return of(this.companyList);
  }

  getCompanyByIndex(companyIndex: number) {
    return this.companyList[companyIndex];
  }

  createNewCompany(formData: Company) {
    console.log(formData);

    const { name, typeOfBusiness, companyEmployees } = formData;
    const company = new Company(name, typeOfBusiness, companyEmployees);
    this.companyList.push(company);
    console.log(this.companyList);
  }

  addEmployeeToEmployeeList(company: Company, employeeData: IEmployee) {
    company.addNewEmployeeData(employeeData);
  }

  editCompanyData(companyEditedData: Company) {
    const editedCompanyIndex = this.companyList.findIndex(
      (company) => company.id === companyEditedData.id
    );

    this.companyList[editedCompanyIndex] = companyEditedData;
  }
}
