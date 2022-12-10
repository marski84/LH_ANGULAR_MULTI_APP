import { Component, OnInit, AfterViewInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { faker } from '@faker-js/faker';
import { DictionaryServiceService } from 'projects/products-module/src/app/modules/products-list/product/dictionary-service.service';
import { filter, map, take, tap, debounceTime } from 'rxjs';
import { IModifiedProductApiResponse } from '../models/modifiedApiReponse.interface';
import { ProductApiService } from '../product-api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, AfterViewInit {
  formFields: string[] = [];
  formData!: IModifiedProductApiResponse;

  editedProductDataEmitted = new EventEmitter<IModifiedProductApiResponse>();

  productForm: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private dictionaryService: DictionaryServiceService,
    private productService: ProductApiService,
    private dialogRef: MatDialogRef<any>, //   boolean
    private acivatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngAfterViewInit(): void {
    return;
  }

  ngOnInit(): void {
    // cold observable- take(1) in order to simulate dictionary api
    this.dictionaryService
      .getFormParams()
      .pipe(
        take(1),
        tap((value) => (this.formFields = value))
      )
      .subscribe();

    this.acivatedRoute.data
      .pipe(
        filter((data) => data['product'] !== undefined),
        tap((value) => console.log(value)),
        map((data) => this.prepareFormData(data))
      )
      .subscribe();

    this.handleFormControlsInit(this.formData);
  }

  private prepareFormData(data: {
    [product: string]: IModifiedProductApiResponse[];
  }) {
    const formData: IModifiedProductApiResponse = data['product'][0];
    this.formData = formData;

    return formData;
  }

  private handleFormControlsInit(formData?: IModifiedProductApiResponse) {
    this.formFields.forEach((formField: string) => {
      if (formData) {
        const controlValue =
          formData[formField as keyof IModifiedProductApiResponse];
        this.registerFormControl(formField, controlValue as string);
      }

      if (formField === 'id') {
        const id = faker.datatype.uuid();
        this.registerFormControl(formField, id);
        this.productForm.get('id')?.disable();
      }
      this.registerFormControl(formField);
    });
  }

  private registerFormControl(controlName: string, ctrlValue?: string) {
    const ctrl = this.fb.control(ctrlValue, Validators.required);

    this.productForm.addControl(controlName, ctrl);
  }

  closeDialog() {
    if (!this.formData) {
      this.dialogRef.close();
    }
    this.router.navigate(['']);
  }

  onDialogAccept() {
    console.log(this.productForm);

    // handle addNew
    if (!this.formData) {
      this.dialogRef.close(this.productForm.value);
      return;
    }
    // handle edit
    this.productService
      .editProduct(this.productForm.getRawValue())
      .pipe(
        debounceTime(1000),
        tap(() => this.router.navigate(['']))
      )
      .subscribe();

    return;
  }
}
