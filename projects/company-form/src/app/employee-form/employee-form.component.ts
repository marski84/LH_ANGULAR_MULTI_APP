import { Component, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EventEmitter } from '@angular/core';

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

  @Input()
  employeeIndex!: number;

  // @Output() companyDataEmitted: EventEmitter<ICompany> =
  //   new EventEmitter<ICompany>();

  @Output()
  employeeFormIndexForDeleteEmitted: EventEmitter<number> = new EventEmitter<number>();

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

  ngOnInit(): void {
    console.log(this.employeeIndex);
  }

  employeeFormDeleteEmitted() {
    this.employeeFormIndexForDeleteEmitted.emit(this.employeeIndex);
  }
}
