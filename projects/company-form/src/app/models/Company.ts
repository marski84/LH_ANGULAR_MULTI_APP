import { IEmployee } from './IEmployee';
import { faker } from '@faker-js/faker';

export class Company {
  id: string;
  name: string;
  typeOfBusiness: string;
  companyEmployees: IEmployee[];

  constructor(
    name: string,
    typeOfBusiness: string,
    companyEmployees: IEmployee[]
  ) {
    this.id = faker.datatype.uuid();
    this.name = name;
    this.typeOfBusiness = typeOfBusiness;
    this.companyEmployees = companyEmployees;
  }

  addNewEmployeeData(employeeData: IEmployee) {
    this.companyEmployees.push(employeeData);
  }

  editCompanyData(companyData: Company) {
    const { name, typeOfBusiness, companyEmployees } = companyData;

    this.name = name;
    this.typeOfBusiness = typeOfBusiness;
    this.companyEmployees = companyEmployees;
  }
}
