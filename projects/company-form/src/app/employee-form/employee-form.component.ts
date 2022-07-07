import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  @Input()
  parentForm!: FormGroup;

  @Input()
  employeeForm!: FormGroup;

  get employeeFirstNameCtrl() {
    return this.employeeForm.controls['firstName'] as FormControl;
  }

  get employeeLastNameCtrl() {
    return this.employeeForm.controls['lastName'] as FormControl;
  }

  get employeeAgeCtrl() {
    return this.employeeForm.controls['employeeAge'] as FormControl;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
