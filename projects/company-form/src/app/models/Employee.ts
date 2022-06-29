import { IEmployee } from "./IEmployee";

export class Employee implements IEmployee {
  firstName: string;
  lastName: string;
  employeeAge: number;

  constructor(firstname: string, lastName: string, employeeAge: number) {
    this.firstName = firstname;
    this.lastName = lastName;
    this.employeeAge = employeeAge;
  };

}
