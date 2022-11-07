import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IjokeForm } from '../models/jokeForm.interface';
import { map, Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { IjokeApiResponse } from '../models/jokeApiResponse.interface';
import { IformattedJokeResponse } from '../models/formattedJokeResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class JokesApiService {
  jokeDataSubject$ = new ReplaySubject<IformattedJokeResponse>();
  jokesDownloadingStarted$ = new Subject<void>();
  readonly jokeData$: Observable<IformattedJokeResponse> =
    this.jokeDataSubject$.asObservable();

  constructor(private http: HttpClient) {}

  getJokes(formData: IjokeForm): Observable<IformattedJokeResponse> {
    this.jokesDownloadingStarted$.next();
    const { category, type, blackList } = formData;
    const queryParams = this.returnQueryParams(type, blackList);

    return this.http
      .get<IjokeApiResponse>(
        `https://v2.jokeapi.dev/joke/${category.join(',')}`,
        {
          params: queryParams,
        }
      )
      .pipe(
        map((data) => this.formatApiResponse(data)),
        tap((formattedData) => this.jokeDataSubject$.next(formattedData))
      );
  }

  private returnQueryParams(type: string[], blackList: string[]) {
    let queryParams: HttpParams = new HttpParams().set('type', type.join(','));

    if (blackList.length) {
      queryParams = queryParams.set('blacklistFlags', blackList.join(','));
    }

    return queryParams;
  }

  private formatApiResponse(
    apiResponse: IjokeApiResponse
  ): IformattedJokeResponse {
    const formatedData = {
      jokeCategory: apiResponse.category,
      type: apiResponse.type,
      joke: apiResponse.joke,
      twoPartJokeQuostion: apiResponse.setup,
      twoPartJokeAnswer: apiResponse.delivery,
    };
    return formatedData;
  }
}
