import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IjokeForm } from '../models/jokeForm.interface';
import { Observable, ReplaySubject } from 'rxjs';
import { IjokeApiResponse } from '../models/jokeApiResponse.interface';
import { IformattedJokeResponse } from '../models/formattedJokeResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class JokesApiService {
  constructor(private http: HttpClient) {}

  jokeDataSubject$ = new ReplaySubject<IformattedJokeResponse>();

  readonly jokeData$: Observable<IformattedJokeResponse> =
    this.jokeDataSubject$.asObservable();

  private setQueryParams(type: string[], blackList: string[]) {
    let queryParams: HttpParams;
    if (blackList.length) {
      queryParams = new HttpParams()
        .set('blacklistFlags', blackList.join(','))
        .set('type', type.join(','));
    } else {
      queryParams = new HttpParams().set('type', type.join(','));
    }

    return queryParams;
  }

  getJokes(formData: IjokeForm): Observable<IjokeApiResponse> {
    const { category, type, blackList } = formData;

    const queryParams = this.setQueryParams(type, blackList);

    return this.http.get<IjokeApiResponse>(
      `https://v2.jokeapi.dev/joke/${category.join(',')}?`,
      {
        params: queryParams,
      }
    );
  }
}
