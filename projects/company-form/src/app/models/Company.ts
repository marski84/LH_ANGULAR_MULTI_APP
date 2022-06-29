import { ICompany } from './ICompany';
import { IEmployee } from './IEmployee';




export class Company implements ICompany {
  name: string;
  typeOfBusiness: string;
  employees: IEmployee[];

  constructor(name: string, typeOfBusiness: string, employees: IEmployee[]) {
    this.name = name;
    this.typeOfBusiness = typeOfBusiness;
    this.employees = employees;
  };

  addNewEmployeeData(employeeData: IEmployee) {
    this.employees.push(employeeData);
  }

}
