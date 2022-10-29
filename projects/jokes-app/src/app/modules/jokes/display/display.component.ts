import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { BehaviorSubject, finalize, tap, map, combineLatest } from 'rxjs';
import { JokesApiService } from '../jokes-form-container/jokes-api.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit {
  constructor(private jokesApiService: JokesApiService) {}

  private _isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this._isLoading.asObservable();

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  jokeDataReceiver$ = this.jokesApiService.jokeData$;

  ngOnInit(): void {
    combineLatest([this.jokeDataReceiver$])
      .pipe(
        tap(() => this._isLoading.next(true)),
        finalize(() => this._isLoading.next(false))
      )
      .subscribe();
  }
}
