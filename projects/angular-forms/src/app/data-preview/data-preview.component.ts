import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import {
  delay,
  map,
  Observable,
  of,
  tap,
  Subscription,
  finalize,
  BehaviorSubject,
  debounceTime,
} from 'rxjs';
import { IFormData } from '../models/IFormData';
import { FakeApiService } from '../services/fake-api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'data-preview',
  templateUrl: './data-preview.component.html',
  styleUrls: ['./data-preview.component.scss'],
})
export class DataPreviewComponent implements OnInit {
  formData!: string;
  private _isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this._isLoading.asObservable();

  OnDestroy$: Subject<void> = new Subject<void>();

  formDataResult$!: Observable<Subscription>;

  constructor(private dataApi: FakeApiService) {}

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  ngOnInit(): void {
    this.dataApi.formData$
      .pipe(
        takeUntil(this.OnDestroy$),
        tap(() => {
          console.log(1);
          this.showLoader();
        }),
        debounceTime(500),

        map((data) => {
          this.parseData(data)
            .pipe(
              map((formData) => {
                this.formData = formData;
              }),
              finalize(() => this.hideLoader())
            )
            .subscribe();
        })
      )
      .subscribe();
  }

  parseData(data: IFormData): Observable<string> {
    const { userName, email, accountType, nipNumber } = data;
    const res = `email: ${email} | name: ${userName} | type: ${accountType} ${
      nipNumber ? 'NIP:' + nipNumber : ''
    }`;
    return of(res).pipe(
      delay(2000) // simulation of calculation proccess
    );
  }

  showLoader() {
    this._isLoading.next(true);
  }

  hideLoader() {
    this._isLoading.next(false);
  }

  ngOnDestroy(): void {
    this.OnDestroy$.next();
    this.OnDestroy$.complete();
  }
}
