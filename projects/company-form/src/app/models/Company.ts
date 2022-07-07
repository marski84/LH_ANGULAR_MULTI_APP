import { ICompany } from './ICompany';
import { IEmployee } from './IEmployee';

export class Company {
  name: string;
  typeOfBusiness: string;
  employees: IEmployee[];

  constructor(name: string, typeOfBusiness: string, employees: IEmployee[]) {
    this.name = name;
    this.typeOfBusiness = typeOfBusiness;
    this.employees = employees;
  }

  addNewEmployeeData(employeeData: IEmployee) {
    this.employees.push(employeeData);
  }

  editCompanyData(companyData: ICompany) {
    const { name, typeOfBusiness, companyEmployees } = companyData;

    this.name = name;
    this.typeOfBusiness = typeOfBusiness;
    this.employees = companyEmployees;
  }
}
