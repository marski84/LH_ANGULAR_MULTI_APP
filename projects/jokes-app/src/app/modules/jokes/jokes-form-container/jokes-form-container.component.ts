import { Component, OnInit } from '@angular/core';
import { JokesApiService } from './jokes-api.service';
import { map, tap } from 'rxjs';
import { IjokeForm } from '../models/jokeForm.interface';
import { HttpResponse } from '@angular/common/http';
import { IjokeApiResponse } from '../models/jokeApiResponse.interface';
import { IformattedJokeResponse } from '../models/formattedJokeResponse.interface';

@Component({
  selector: 'app-jokes-form-container',
  templateUrl: './jokes-form-container.component.html',
  styleUrls: ['./jokes-form-container.component.scss'],
})
export class JokesFormContainerComponent implements OnInit {
  constructor(private jokesApiService: JokesApiService) {}

  ngOnInit() {}

  private getJokes(formData: IjokeForm) {
    this.jokesApiService
      .getJokes(formData)
      .pipe(
        map((data) => this.formatApiResponse(data)),
        tap((resp) => this.jokesApiService.jokeDataSubject$.next(resp))
      )
      .subscribe();
  }

  handleFormData(formData: IjokeForm) {
    this.getJokes(formData);
  }

  formatApiResponse(apiResponse: IjokeApiResponse): IformattedJokeResponse {
    console.log(apiResponse);
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
