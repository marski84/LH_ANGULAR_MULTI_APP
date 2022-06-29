import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Company } from './models/Company';
import { Employee } from './models/Employee';
import { IEmployee } from './models/IEmployee';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  first = new Company('firstOne', 'Partnership', [
    new Employee('second', 'secondary', 29),
    new Employee('fdsg', 'fd', 30)
  ])

  second = new Company('second', 'Partnership', [
    new Employee('second', 'secondary', 40),
    new Employee('hiper', 'piper', 20)
  ])

  third = new Company('third', 'Partnership', [
    new Employee('super', 'duper', 40),
    new Employee('hiper', 'piper', 20)
  ])

  companyList = [this.first, this.second, this.third];


  constructor() {

  };
  getCompanyList() {
    return of(this.companyList);
  };

  createNewCompany(formData: any) {
    console.log(formData);

    const { name, typeOfBusiness, companyEmployees } = formData;
    const company = new Company(name, typeOfBusiness, companyEmployees);
    this.companyList.push(company);
  };

  addEmployeeToEmployeeList(company: Company, employeeData: IEmployee) {
    company.addNewEmployeeData(employeeData);
  };


  editCompanyData(comapnyData: Company, comapnyIndex: number) {
    console.log(comapnyData, comapnyIndex);

  }
}
