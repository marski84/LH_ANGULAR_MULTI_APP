import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

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
    const formattedData = Object.values({ ...this.data })[0] as Object;
    // prepare data
    const formFieldsKeys = Object.keys(formattedData);
    this.formFields = formFieldsKeys;
    const values = Object.values(formattedData);

    this.formFields.forEach((field, index) => {
      this.registerFormControl(field, values[index]);

      // disable edition of unique id
      if (index === 0) {
        this.editForm.get([field])?.disable();
      }
    });
  }

  private registerFormControl(controlName: string, ctrlValue: string) {
    const ctrl = this.fb.control(ctrlValue, Validators.required);
    this.editForm.addControl(controlName, ctrl);
  }

  onSubmit(formValue: any) {
    console.log(formValue);
  }

  update() {
    this.dialogRef.close({ event: this.editForm.getRawValue() });
  }

  close() {
    this.dialogRef.close({ event: null });
    console.log('close');
  }
}
