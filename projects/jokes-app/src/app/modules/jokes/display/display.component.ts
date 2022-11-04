import { Component, OnInit } from '@angular/core';
import { JokesApiService } from '../jokes-form-container/jokes-api.service';
import { JokeType } from '../models/jokeType.enum';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit {
  jokeDataReceiver$ = this.jokesApiService.jokeData$;

  jokerTypes = JokeType;

  constructor(private jokesApiService: JokesApiService) {}
  ngOnInit(): void {}
}
