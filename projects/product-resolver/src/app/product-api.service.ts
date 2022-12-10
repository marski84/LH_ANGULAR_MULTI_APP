import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, tap, catchError, of, ReplaySubject } from 'rxjs';
import { IModifiedProductApiResponse } from './models/modifiedApiReponse.interface';
import { IProductApiResponse } from './models/productApiResponse.interface';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService implements OnInit {
  productDataReplaySubject$ = new ReplaySubject<
    IModifiedProductApiResponse[]
  >();

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

  getProducts() {
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
      .pipe(tap((value) => console.log(value)));
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

  sortProducts(direction: string) {
    this.httpClient
      .get<IProductApiResponse[]>(this.apiEndpoint + `?sort=${direction}`)
      .pipe(
        map((response) => this.formatResponse(response)),
        tap((formattedResponse) =>
          this.productDataReplaySubject$.next(formattedResponse)
        )
      )
      .subscribe();
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
      id: id,
      title: title,
      price: price,
      description: description,
      category: category,
      image: image,
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
      id: id,
      title: title,
      price: price,
      description: description,
      category: category,
      image: image,
      rate: rating.rate,
      count: rating.count,
    }) as IModifiedProductApiResponse;
  }
}
