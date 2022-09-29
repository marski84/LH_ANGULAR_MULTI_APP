import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { delay, Observable, of, tap, BehaviorSubject } from 'rxjs';
import { IFormData } from '../models/IFormData';
import { FakeApiService } from '../services/fake-api.service';
import { Subject, takeUntil, switchMap } from 'rxjs';

@Component({
  selector: 'data-preview',
  templateUrl: './data-preview.component.html',
  styleUrls: ['./data-preview.component.scss'],
})
export class DataPreviewComponent implements OnInit {
  private _isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this._isLoading.asObservable();

  private OnDestroy$: Subject<void> = new Subject<void>();

  formDataResult!: string;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  constructor(private dataApi: FakeApiService) {}

  ngOnInit(): void {
    this.dataApi.formDataChanged$
      .pipe(
        takeUntil(this.OnDestroy$),
        tap(() => this._isLoading.next(true)),
        switchMap((data: IFormData) => this.parseData(data)),
        tap((parsedData) => (this.formDataResult = parsedData)),
        tap(() => this._isLoading.next(false))
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

  ngOnDestroy(): void {
    this.OnDestroy$.next();
    this.OnDestroy$.complete();
  }
}
