import { Component, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Employee } from '../models/Employee';
import { Company } from '../models/Company';
import { IselectType } from '../models/IselectType';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss'],
})
export class CompanyFormComponent implements OnInit {
  @Input() set company(data: Company) {
    console.log(this.company);

    this.companyData = data;
    this._handleFormDataEvent();
  }
  companyData?: Company;
  @Output() companyDataEmitted: EventEmitter<Company> =
    new EventEmitter<Company>();

  companyForm = this.fb.group({
    name: ['', [Validators.required]],
    typeOfBusiness: ['', [Validators.required]],
    companyEmployees: this.fb.array([
      this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        employeeAge: ['', Validators.required],
      }),
    ]),
  });

  get companyNameCtrl() {
    return this.companyForm.get(['name']) as FormControl;
  }

  get companyBusinessTypeFormCtrl() {
    return this.companyForm.get(['typeOfBusiness']) as FormControl;
  }

  get companyEmployeesControls() {
    return (this.companyForm.controls['companyEmployees'] as FormArray)
      .controls as FormGroup[];
  }

  get companyEmployees() {
    return this.companyForm.controls['companyEmployees'] as FormArray;
  }

  formGroupAtIndex(index: number) {
    return this.companyEmployees.at(index) as FormGroup;
  }

  companyEmployeesNameCtrl(empIndex: number) {
    return this.companyEmployees.at(empIndex) as FormGroup;
  }

  typeOfBusinessSelectOptions: IselectType[] = [];

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.typeOfBusiness.subscribe((response: IselectType[]) => {
      this.typeOfBusinessSelectOptions = response;
    });
  }
  private _handleFormDataEvent() {
    this.companyEmployees.clear();
    console.log(this.companyData);

    if (this.companyData === undefined) {
      console.log('ok');
      this.addEmployeeForm();
      return;
    }
    this.companyNameCtrl.setValue(this.companyData.name);
    this.companyBusinessTypeFormCtrl.setValue(this.companyData.typeOfBusiness);
    this.companyData.companyEmployees.forEach((employee) => {
      this.addEmployeeForm(employee);
    });
  }

  addEmployeeForm(employee?: Employee) {
    const employeeForm = this.fb.group({
      firstName: [employee?.firstName, Validators.required],
      lastName: [employee?.lastName, Validators.required],
      employeeAge: [employee?.employeeAge, Validators.required],
    });
    this.companyEmployees.push(employeeForm);
  }

  private _deleteEmployeeForm(employeeIndex: number) {
    this.companyEmployees.removeAt(employeeIndex);
  }

  handleEmployeeFormDelete(employyeFormIndex: number) {
    this._deleteEmployeeForm(employyeFormIndex);
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
      const { name, typeOfBusiness, companyEmployees } = this.companyForm.value;

      const companyToEmit = new Company(name, typeOfBusiness, companyEmployees);

      this.companyData
        ? (companyToEmit.id = this.companyData.id)
        : companyToEmit;

      this.companyDataEmitted.emit(companyToEmit);
    }
    return;
  }
  // jezeli invalid
  // nie propaguj danych do parenta
  // ewentualnei notyfikacja itp.
}
