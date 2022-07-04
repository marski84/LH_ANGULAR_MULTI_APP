import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from '../models/Company';
import { ICompany } from '../models/ICompany';
import { Employee } from '../models/Employee';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  companyEmployeeForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    employeeAge: ['', Validators.required]
  });
  @Input() formData?: Employee;

  @Input()
  employeeForm!: FormGroup

  // get employeeCtrl() {
  //   return this.companyEmployeeForm.controls['companyEmployeeForm'] as FormGroup;
  // };

  get employeeFirstNameCtrl() {
    return this.companyEmployeeForm.controls['firstName'] as FormControl;
  };

  get employeeLastNameCtrl() {
    return this.companyEmployeeForm.controls['lastName'] as FormControl;
  };

  get employeeAgeCtrl() {
    return this.companyEmployeeForm.controls['employeeAge'] as FormControl;
  };

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    console.log(this.formData);
    if (this.formData! === undefined) {
      this.handleEmployeeFormCtrl(this.formData)
    }

    this.handleEmployeeFormCtrl();
  }
  handleEmployeeFormCtrl(formData?: Employee) {
    this.employeeFirstNameCtrl.setValue(this.formData?.firstName);
    this.employeeLastNameCtrl.setValue(this.formData?.lastName);
    this.employeeAgeCtrl.setValue(this.formData?.employeeAge);
  };

  // onSubmit(formData: Employee) {
  //   console.log(formData);

  //   return formData;
  // }


}
