import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IProductApiResponse } from './models/productApiResponse.interface';
import { IModifiedProductApiResponse } from './models/modifiedApiReponse.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiEndpoint = 'https://fakestoreapi.com/products';

  constructor(private httpClient: HttpClient) {}

  getProducts(): any {
    return this.httpClient
      .get<IProductApiResponse[]>(this.apiEndpoint)
      .pipe(map((response) => this.formatResponse(response)));
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
