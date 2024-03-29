import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { IProductApiResponse } from './models/productApiResponse.interface';
import { IModifiedProductApiResponse } from './models/modifiedApiReponse.interface';
import { ProductsListModule } from './products-list.module';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiEndpoint = 'https://fakestoreapi.com/products';

  private altApi = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient
      .get<IProductApiResponse[]>(this.apiEndpoint)
      .pipe(map((response) => this.formatResponse(response)));
  }

  getProduct(id: number) {
    return this.httpClient
      .get<IProductApiResponse>(`${this.apiEndpoint}/${id}`)
      .pipe(
        tap((value) => console.log(value)),
        map((response) => this.formatResponse([response]))
      );
  }

  private formatResponse(response: IProductApiResponse[]) {
    const modifiedResponse: IModifiedProductApiResponse[] = response.map(
      (response) => {
        const { id, title, price, description, category, image, rating } =
          response;

        const modifiedResponse: IModifiedProductApiResponse = new Object({
          id: id,
          title: title,
          price: price,
          description: description,
          category: category,
          image: image,
          rate: rating.rate,
          count: rating.count,
        }) as IModifiedProductApiResponse;

        return modifiedResponse;
      }
    );
    return modifiedResponse;
  }
}
