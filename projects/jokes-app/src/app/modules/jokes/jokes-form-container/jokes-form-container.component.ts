import { Component, OnInit } from '@angular/core';
import { JokesApiService } from './jokes-api.service';
import { map, tap } from 'rxjs';
import { IjokeForm } from '../models/jokeForm.interface';
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
    this.jokesApiService.getJokes(formData).subscribe();
  }

  handleFormData(formData: IjokeForm) {
    this.getJokes(formData);
  }
}
