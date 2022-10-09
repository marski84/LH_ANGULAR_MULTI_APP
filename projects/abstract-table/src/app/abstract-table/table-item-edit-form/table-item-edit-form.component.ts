// import { Component, Inject, OnInit } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import {
//   FormArray,
//   FormBuilder,
//   FormControl,
//   Validators,
// } from '@angular/forms';

// @Component({
//   selector: 'app-table-item-edit-form',
//   templateUrl: './table-item-edit-form.component.html',
//   styleUrls: ['./table-item-edit-form.component.scss'],
// })
// export class TableItemEditFormComponent implements OnInit {
//   formFields: any[] = [];

//   editForm = this.fb.group({});

//   get formArray() {
//     return this.editForm.get(['form']) as FormArray;
//   }

//   constructor(
//     public dialogRef: MatDialogRef<TableItemEditFormComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private fb: FormBuilder
//   ) {}

//   ngOnInit() {
//     console.log(this.data);
//     this.formFields = { ...this.data };
//     const formattedData = Object.values({ ...this.data })[0] as Object;
//     // const b = Object.values(a);
//     console.log(formattedData);

//     const formFields = Object.keys(formattedData);
//     this.formFields = formFields;
//     const values = Object.values(formattedData);
//     console.log(formFields);

//     formFields.forEach((field, index) => {
//       // this.editForm.registerControl(field, this.fb.control(''));
//       this.registerFormControl(field, values[index]);
//     });

//     console.log(this.editForm);
//   }

//   private registerFormControl(controlName: string, ctrlValue: string) {
//     console.log(controlName, ctrlValue);

//     const ctrl = this.fb.control(ctrlValue, Validators.required);
//     this.editForm.addControl(controlName, ctrl);
//   }

//   onSubmit(formValue: any) {
//     console.log(formValue);
//   }

//   update() {
//     this.dialogRef.close({ event: this.editForm.value });
//   }

//   close() {
//     this.dialogRef.close({ event: null });
//     console.log('close');
//   }
// }
