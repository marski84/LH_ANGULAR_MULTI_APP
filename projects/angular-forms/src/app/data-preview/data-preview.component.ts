import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { delay, map, Observable, of, tap, Subscription, finalize } from 'rxjs';
import { IFormData } from '../models/IFormData';
import { FakeApiService } from '../services/fake-api.service';

@Component({
  selector: 'data-preview',
  templateUrl: './data-preview.component.html',
  styleUrls: ['./data-preview.component.scss'],
})
export class DataPreviewComponent implements OnInit {
  formData!: string;

  formDataResult$!: Observable<Subscription>;

  constructor(private dataApi: FakeApiService) {}

  isLoading = false;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  ngOnInit(): void {
    this.dataApi.formData$
      .pipe(
        tap(() => (this.isLoading = true)),
        map((data) => {
          this.parseData(data)
            .pipe(
              map((formData) => {
                this.isLoading = true;
                this.formData = formData;
              }),
              finalize(() => (this.isLoading = false))
            )
            .subscribe();
        }),
        tap((data) => (this.isLoading = false))
      )
      .subscribe();

    // this.formDataResult$ = this.dataApi.formData$.pipe(
    //   tap((value) => (this.isLoading = true)),
    //   map((data) => {
    //     return this.parseData(data).subscribe((result) => console.log(result));
    //   })
    // );
  }

  parseData(
    // email: string,
    // name: string,
    // type: string,
    // nip?: string
    data: IFormData
  ): Observable<string> {
    const { userName, email, accountType, nipNumber } = data;
    const res = `email: ${email} | name: ${userName} | type: ${accountType} ${
      nipNumber ? 'NIP:' + nipNumber : ''
    }`;
    return of(res).pipe(
      delay(2000) // simulation of calculation proccess
    );
  }
}
