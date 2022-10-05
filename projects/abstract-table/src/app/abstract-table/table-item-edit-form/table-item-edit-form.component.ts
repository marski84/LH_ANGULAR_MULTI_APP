import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-table-item-edit-form',
  templateUrl: './table-item-edit-form.component.html',
  styleUrls: ['./table-item-edit-form.component.scss'],
})
export class TableItemEditFormComponent implements OnInit {
  formFields: any[] = [];

  editForm = this.fb.group({});

  get formArray() {
    return this.editForm.get(['form']) as FormArray;
  }

  constructor(
    public dialogRef: MatDialogRef<TableItemEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    console.log(this.data);
    this.formFields = { ...this.data };
    const formattedData = Object.values({ ...this.data })[0] as Object;
    // const b = Object.values(a);
    console.log(formattedData);

    const formFields = Object.keys(formattedData);
    this.formFields = formFields;
    const values = Object.values(formattedData);
    console.log(formFields);

    formFields.forEach((field) => {
      this.editForm.registerControl(field, this.fb.control(''));
    });

    console.log(this.editForm);
  }
}
