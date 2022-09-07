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
} from 'rxjs';
import { FakeApiService } from '../services/fake-api.service';

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
          this.handleAccountTypeControl(ctrlValue);
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
        switchMap((data) => this.dataApi.sendFormData(data))
      )
      .subscribe();
  }

  handleAccountTypeControl(controlSelectedValue: string) {
    if (controlSelectedValue === 'company') {
      const nipNumber = this.fb.control('', Validators.required);

      this.editFormCtrl.addControl('nipNumber', nipNumber);
    } else {
      this.editFormCtrl.removeControl('nipNumber');
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
