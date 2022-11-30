import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take, tap } from 'rxjs';
import { DictionaryServiceService } from './dictionary-service.service';
import { MatDialogModule } from '@angular/material/dialog';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { faker } from '@faker-js/faker';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  formFields: any = [];

  productForm: FormGroup = this.fb.group({});
  newProductForm = true;

  constructor(
    private fb: FormBuilder,
    private dictionaryService: DictionaryServiceService,
    private dialogRef: MatDialogRef<any>, // @Inject(MAT_DIALOG_DATA) data?: boolean
    private acivatedRoute: ActivatedRoute,
    private router: Router // private activatedRouteSnapshot: ActivatedRouteSnapshot
  ) {
    // if (data) {
    //   this.newProductForm = data;
    // }
  }

  ngOnInit(): void {
    console.log(this.acivatedRoute.data.subscribe((data) => console.log(data)));

    // cold observable- take(1) in order to simulate dictionary api
    this.dictionaryService
      .getFormParams()
      .pipe(
        take(1),
        tap((value) => (this.formFields = value))
      )
      .subscribe();

    console.log();

    this.formFields.forEach((formField: string) => {
      if (this.newProductForm && formField === 'id') {
        const id = faker.datatype.uuid();
        this.registerFormControl(formField, id);
        this.productForm.get('id')?.disable();
      }
      this.registerFormControl(formField);
    });

    // id: faker.datatype.uuid(), console.log(this.productForm);
  }

  private registerFormControl(controlName: string, ctrlValue?: string) {
    const ctrl = this.fb.control(ctrlValue, Validators.required);
    this.productForm.addControl(controlName, ctrl);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addProduct() {}
}
