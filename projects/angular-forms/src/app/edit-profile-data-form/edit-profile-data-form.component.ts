import { IAccountType } from './../models/IAccountType';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import {
  map,
  switchMap,
  Subscription,
  debounceTime,
  takeUntil,
  Subject,
  filter,
  tap,
  of,
  Observable,
  switchAll,
} from 'rxjs';
import { FakeApiService } from '../services/fake-api.service';
import { IFormData } from '../models/IFormData';

@Component({
  selector: 'edit-profile-data-form',
  templateUrl: './edit-profile-data-form.component.html',
  styleUrls: ['./edit-profile-data-form.component.scss'],
})
export class EditProfileDataFormComponent implements OnInit, OnDestroy {
  @Input() accountTypeDict!: IAccountType[];

  formChangesSubscription!: Subscription;

  private onDestroy$: Subject<void> = new Subject<void>();

  editDataForm = this.fb.group({
    userName: ['', Validators.required],
    email: ['', Validators.required],
    accountType: ['', Validators.required],
  });

  get editFormCtrl() {
    return this.editDataForm as FormGroup;
  }

  get userNameCtrl() {
    return this.editFormCtrl.get(['userName']) as FormControl;
  }

  get emailCtrl() {
    return this.editFormCtrl.get(['email']) as FormControl;
  }

  get accountTypeCtrl() {
    return this.editFormCtrl.get(['accountType']) as FormControl;
  }

  get nipNumberCtrl() {
    return this.editFormCtrl.get(['nipNumber']) as FormControl;
  }

  constructor(private fb: FormBuilder, private dataApi: FakeApiService) {}

  ngOnInit() {
    this.accountTypeCtrl.valueChanges
      .pipe(
        map((ctrlValue) => {
          if (ctrlValue === 'company') {
            const nipNumber = this.fb.control('', Validators.required);

            this.editFormCtrl.addControl('nipNumber', nipNumber);
          } else {
            this.editFormCtrl.removeControl('nipNumber');
          }
        })
      )
      .subscribe();

    this.editFormCtrl.valueChanges
      .pipe(
        takeUntil(this.onDestroy$),
        debounceTime(500),

        filter((formData) => {
          if (this.editFormCtrl.valid) {
            return formData;
          }
        }),
        map((result) => of(result)),
        switchAll(),
        map((result) => this.dataApi.sendFormData(result))
      )

      .subscribe();
  }

  onSubmit(formData: any) {
    console.log(formData);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
