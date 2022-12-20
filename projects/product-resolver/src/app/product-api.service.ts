import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, tap, catchError, of } from 'rxjs';
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

  private apiEndpoint = 'https://fakestoreapi.com/products';

  constructor(
    private httpClient: HttpClient,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    return;
  }

  getProductsData() {
    return this.productDataReplaySubject$.asObservable();
  }

  getProducts(sortDirection?: string) {
    if (sortDirection) {
      this.httpClient
        .get<IProductApiResponse[]>(this.apiEndpoint + `?sort=${sortDirection}`)
        .pipe(
          map((response) => this.formatResponse(response)),
          tap((formattedResponse) =>
            this.productDataReplaySubject$.next(formattedResponse)
          )
        )
        .subscribe();
    }
    return this.httpClient.get<IProductApiResponse[]>(this.apiEndpoint).pipe(
      map((response) => this.formatResponse(response)),
      tap((formattedResponse) =>
        this.productDataReplaySubject$.next(formattedResponse)
      )
    );
  }

  getProductData(id: number) {
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
        tap(() => this.getProducts().subscribe)
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
      (response) => {
        const modifiedResponse: IModifiedProductApiResponse =
          this.createModifiedResponse(response);

        return modifiedResponse;
      }
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
