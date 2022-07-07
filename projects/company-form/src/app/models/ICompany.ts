import { IEmployee } from './IEmployee';

export interface ICompany {
  name: string;
  typeOfBusiness: string;
  companyEmployees: IEmployee[];
}
