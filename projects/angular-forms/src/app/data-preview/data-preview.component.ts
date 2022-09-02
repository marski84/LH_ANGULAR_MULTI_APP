import { Component, Input, OnInit } from '@angular/core';
import { delay, map, Observable, of, tap, Subscription } from 'rxjs';
import { IFormData } from '../models/IFormData';
import { FakeApiService } from '../services/fake-api.service';

@Component({
  selector: 'data-preview',
  templateUrl: './data-preview.component.html',
  styleUrls: ['./data-preview.component.scss'],
})
export class DataPreviewComponent implements OnInit {
  // formData!: string;

  formDataResult$!: Observable<Subscription>;

  constructor(private dataApi: FakeApiService) {}

  ngOnInit(): void {
    // this.dataApi.formData$
    //   .pipe(
    //     map((data) => {
    //       this.parseData(data).subscribe((result) => (this.formData = result));
    //     })
    //   )
    //   .subscribe();

    this.formDataResult$ = this.dataApi.formData$.pipe(
      map((data) => {
        return this.parseData(data).subscribe((result) => console.log(result));
      })
    );
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
