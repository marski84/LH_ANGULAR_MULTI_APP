import { FakeApiService } from './../services/fake-api.service';
import { IAccountType } from './../models/IAccountType';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { takeUntil, Subject, tap } from 'rxjs';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
})
export class FormContainerComponent implements OnInit {
  typeOfAccount!: IAccountType[];

  onDestroy$ = new Subject();

  formData: any;

  constructor(private dataApi: FakeApiService) {}

  ngOnInit() {
    this.dataApi
      .getTypeOfContactDictionary()
      .pipe(
        takeUntil(this.onDestroy$),
        tap((data) => (this.typeOfAccount = data))
      )
      .subscribe();
  }
}
