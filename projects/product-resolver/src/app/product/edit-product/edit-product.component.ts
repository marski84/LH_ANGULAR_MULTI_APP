import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, tap, map, Observable, debounceTime, delay } from 'rxjs';
import { IModifiedProductApiResponse } from '../../models/modifiedApiReponse.interface';
import { ProductApiService } from '../../product-api.service';
import { ProductFormComponent } from '../product-form/product-form.component';

const formControlNames = [
  'id',
  'title',
  'price',
  'description',
  'category',
  'image',
  'rate',
  'count',
];

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  providers: [{ provide: 'formControlNames', useValue: formControlNames }],
})
export class EditProductComponent implements OnInit {
  formDataSubscription$: Observable<IModifiedProductApiResponse> =
    this.acivatedRoute.data.pipe(
      filter((data) => data['product'] !== undefined),
      map((data) => data['product'][0])
    );

  constructor(
    private acivatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductApiService
  ) {
    return;
  }

  @ViewChild('editForm') editForm!: ProductFormComponent;

  ngOnInit(): void {
    return;
  }

  handleFormClosed() {
    this.router.navigate(['']);
  }

  handleFormEdit(formDataEvent: string) {
    console.log(formDataEvent);
    const editedData = this.editForm.productForm.getRawValue();

    this.productService
      .editProduct(editedData)
      .pipe(tap(() => this.router.navigate([''])))
      .subscribe();
  }
}
