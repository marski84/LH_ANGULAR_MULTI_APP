import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { BehaviorSubject, Subject } from 'rxjs';
import { JokesApiService } from '../jokes-form-container/jokes-api.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit {
  constructor(private jokesApiService: JokesApiService) {}

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  jokeDataReceiver$ = this.jokesApiService.jokeData$;

  ngOnInit(): void {}
}
