import { FakeApiService } from './../services/fake-api.service';
import { IAccountType } from './../models/IAccountType';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { takeUntil, Subject, tap, finalize } from 'rxjs';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
})
export class FormContainerComponent implements OnInit, OnDestroy {
  typeOfAccount!: IAccountType[];

  private onDestroy$: Subject<void> = new Subject<void>();

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

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
