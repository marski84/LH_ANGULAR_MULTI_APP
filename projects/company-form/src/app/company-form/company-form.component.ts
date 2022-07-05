import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { ICompany } from '../models/ICompany';
import { Employee } from '../models/Employee';
import { Company } from '../models/Company';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
  // nie piszemy input/output w nazwie zmiennej
  @Input() companyData?: ICompany;
  // Output -> nazywamy czasownikiem w czasie przeszłym tzn. companyFormSubmitted / companyCreated
  // Jeden Output po submicie formularza
  // Typowanie zmienić na companyI ewentualnie napisać typ dla danych emitowanych
  @Output() companyDataEvent: EventEmitter<Company> = new EventEmitter<Company>();

  companyEmployeesArray: Employee[] = [];

  employeeForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    employeeAge: ['', Validators.required]
  });

  companyForm = this.fb.group({
    name: ['', [Validators.required]],
    typeOfBusiness: ['', [Validators.required]],
    companyEmployees: this.fb.array(
      [])
  });

  get companyNameCtrl() {
    return this.companyForm.get(['name']) as FormControl;
  };

  get companyBusinessTypeFormCtrl() {
    return this.companyForm.get(['typeOfBusiness']) as FormControl;
  };

  get companyEmployeesControls() {
    return (this.companyForm.controls['companyEmployees'] as FormArray).controls as FormGroup[];
  };


  get companyEmployees() {
    return (this.companyForm.controls['companyEmployees'] as FormArray);
  };



  formGroupAtIndex(index: number) {
    // return this.companyEmployees.at(index) as FormGroup;
  }

  companyEmployeesNameCtrl(empIndex: number) {
    // return this.companyEmployees.at(empIndex) as FormGroup
  };

  typeOfBusinessSelectOptions = [
    {
      value: 'Sole proprietorship', viewValue: 'Sole proprietorship'
    }, { value: 'Partnership', viewValue: 'Partnership' },
    { value: 'Limited liability company (LLC)', viewValue: 'Limited liability company (LLC)' },
    { value: 'Limited liability company (LLC)', viewValue: 'Limited liability company (LLC)' },
    { value: 'Corporation - C corp', viewValue: 'Corporation - C corp' },
    { value: 'Corporation - S corp', viewValue: 'Corporation - S corp' },
    { value: 'Corporation - B corp', viewValue: 'Corporation - B corp' },
    { value: 'Corporation - nonprofit', viewValue: 'Corporation - nonprofit' },
  ]


  constructor(private fb: FormBuilder) {
    // console.log(this.companyEmployees.controls);

  }

  ngOnInit(): void {
    if (this.companyData) {

      this.companyEmployeesArray = this.companyData.employees;

      this.companyNameCtrl.setValue(this.companyData.name);
      this.companyBusinessTypeFormCtrl.setValue(this.companyData.typeOfBusiness);
      this.companyData.employees.forEach((employee) => {
        this.addEmployeeForm(employee);
        return;
      });




      if (!this.companyData) {
        this.addEmployeeForm();
      }
    };

    // const initialEmployeeForm = this.addEmployeeForm();
    // return this.companyEmployees.push(initialEmployeeForm);
  };

  onSubmit(form: Company): void {
    if (!this.companyData) {
      this.companyDataEvent.emit(form);
      this.companyForm.reset();
      return;
    }
    return this.companyDataEvent.emit(form);
  };

  // dodał opcjonalne dane wchodzące
  addEmployeeForm(employee?: Employee) {
    const employeeForm = this.fb.group({
      firstName: [employee?.firstName, Validators.required],
      lastName: [employee?.lastName, Validators.required],
      employeeAge: [employee?.employeeAge, Validators.required]


    });

    this.companyEmployeesControls.push(employeeForm)
  };

  deleteEmployeeForm(employeeIndex: number) {
    this.companyEmployees.removeAt(employeeIndex);
  }

}
