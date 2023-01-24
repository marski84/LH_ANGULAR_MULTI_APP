import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, tap, catchError, of, switchMap } from 'rxjs';
import { IModifiedProductApiResponse } from './models/modifiedApiReponse.interface';
import { IProductApiResponse } from './models/productApiResponse.interface';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService implements OnInit {
  productDataReplaySubject$ = new BehaviorSubject<
    IModifiedProductApiResponse[]
  >([]);

  products$ = this.productDataReplaySubject$.asObservable();
  private apiEndpoint = 'https://fakestoreapi.com/products';

  constructor(
    private httpClient: HttpClient,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    return;
  }

  getProducts(sortDirection?: string) {
    if (sortDirection) {
      const params = new HttpParams().set('sort', sortDirection);

      this.httpClient
        .get<IProductApiResponse[]>(this.apiEndpoint, { params })
        .pipe(
          map((response) => this.formatResponse(response)),
          tap((formattedResponse) =>
            this.productDataReplaySubject$.next(formattedResponse)
          )
        )
        .subscribe();
    }
    // subscribe handled by product-list.resolver
    return this.httpClient.get<IProductApiResponse[]>(this.apiEndpoint).pipe(
      map((response) => this.formatResponse(response)),
      tap((formattedResponse) =>
        this.productDataReplaySubject$.next(formattedResponse)
      )
    );
  }

  getProduct(id: number) {
    return this.httpClient
      .get<IProductApiResponse>(`${this.apiEndpoint}/${id}`)
      .pipe(
        map((response) => this.formatResponse([response])),
        catchError((error) => {
          return of(error);
        })
      );
  }

  addNewProduct(newProductData: IModifiedProductApiResponse) {
    const body = JSON.stringify(
      this.formatDataBeforeSendingToApi(newProductData)
    );
    return this.httpClient
      .post<IProductApiResponse>(this.apiEndpoint, body)
      .pipe(
        tap((value) => console.log(value)),
        tap((newProductId) =>
          this.toastService.success(
            `New product id: ${newProductId}`,
            'New product Added!'
          )
        ),
        switchMap(() => this.getProducts())
      );
  }

  editProduct(editedProductData: IModifiedProductApiResponse) {
    const body = JSON.stringify(
      this.formatDataBeforeSendingToApi(editedProductData)
    );

    return this.httpClient
      .put<IModifiedProductApiResponse>(
        this.apiEndpoint + `/${editedProductData.id}`,
        body
      )
      .pipe(
        map((response) => response),
        tap(() =>
          this.toastService.success(
            `Product with id=${editedProductData.id} succesfully updated`,
            'Success'
          )
        )
      );
  }

  private formatResponse(response: IProductApiResponse[]) {
    const modifiedResponse: IModifiedProductApiResponse[] = response.map(
      (response) => this.createModifiedResponse(response)
    );
    return modifiedResponse;
  }

  private formatDataBeforeSendingToApi(data: IModifiedProductApiResponse) {
    const { id, title, price, description, category, image, rate, count } =
      data;
    const dataToSend: IProductApiResponse = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating: {
        rate: rate,
        count: count,
      },
    };
    return dataToSend;
  }

  private createModifiedResponse(
    response: IProductApiResponse
  ): IModifiedProductApiResponse {
    const { id, title, price, description, category, image, rating } = response;

    return new Object({
      id,
      title,
      price,
      description,
      category,
      image,
      rate: rating.rate,
      count: rating.count,
    }) as IModifiedProductApiResponse;
  }
}
