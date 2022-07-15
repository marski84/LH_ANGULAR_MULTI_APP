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
  @Input() employeeForm!: FormGroup;

  @Input()
  employeeIndex!: number;

  @Input()
  canBeDeleted: boolean = false;

  @Output() formDeletedEmitted: EventEmitter<number> =
    new EventEmitter<number>();

  get employeeFirstNameCtrl() {
    return this.employeeForm.controls['firstName'] as FormControl;
  }

  get employeeLastNameCtrl() {
    return this.employeeForm.controls['lastName'] as FormControl;
  }

  get employeeAgeCtrl() {
    return this.employeeForm.controls['employeeAge'] as FormControl;
  }

  constructor() {}

  ngOnInit(): void {}

  employeeFormDeleteEmitted() {
    this.formDeletedEmitted.emit(this.employeeIndex);
  }
}
