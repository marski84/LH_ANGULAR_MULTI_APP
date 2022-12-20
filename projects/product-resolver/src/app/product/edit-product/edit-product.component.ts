import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, tap, map, Observable, debounceTime } from 'rxjs';
import { IModifiedProductApiResponse } from '../../models/modifiedApiReponse.interface';
import { ProductApiService } from '../../product-api.service';

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

export interface IactivatedRouteData {
  product: IModifiedProductApiResponse[];
}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  providers: [{ provide: 'formControlNames', useValue: formControlNames }],
})
export class EditProductComponent implements OnInit {
  constructor(
    private acivatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductApiService
  ) {
    return;
  }

  formDataSubscription$: Observable<IModifiedProductApiResponse> | undefined;

  ngOnInit(): void {
    this.formDataSubscription$ = this.acivatedRoute.data.pipe(
      filter((data) => data['product'] !== undefined),
      map((data) => data['product'][0])
    );
  }

  handleFormClosed() {
    this.router.navigate(['']);
  }

  handleFormEdit(editedFormData: IModifiedProductApiResponse) {
    this.productService
      .editProduct(editedFormData)
      .pipe(
        debounceTime(1000),
        tap(() => this.router.navigate(['']))
      )
      .subscribe();
  }
}
