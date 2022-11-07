import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, delay, finalize, first, map, Subject, takeUntil, tap, timer } from 'rxjs';
import { JokesApiService } from '../jokes-form-container/jokes-api.service';
import { JokeType } from '../models/jokeType.enum';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit, OnDestroy {
  jokeDataReceiver$ = this.jokesApiService.jokeData$;
  jokerTypes = JokeType;
  isLoading = false;
  private onDestroy$ = new Subject<void>();

  constructor(private jokesApiService: JokesApiService) {}

  ngOnInit(): void {
    this.jokesApiService.jokesDownloadingStarted$.pipe(takeUntil(this.onDestroy$)).subscribe(() => this.loadingState());
  }

  loadingState() {
    this.isLoading = true;
    combineLatest([timer(500), this.jokeDataReceiver$.pipe(first())])
      .pipe(
        takeUntil(this.onDestroy$),
        map(x => x[1]),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
