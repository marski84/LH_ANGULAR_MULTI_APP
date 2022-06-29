import { IEmployee } from "./IEmployee";

export interface ICompany {
  name: string;
  typeOfBusiness: string;
  employees: IEmployee[];
}
