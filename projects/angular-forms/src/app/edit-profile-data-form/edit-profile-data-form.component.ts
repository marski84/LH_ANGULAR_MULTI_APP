import { IAccountType } from './../models/IAccountType';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { delay, map, switchMap } from 'rxjs';
import { FakeApiService } from '../services/fake-api.service';

@Component({
  selector: 'edit-profile-data-form',
  templateUrl: './edit-profile-data-form.component.html',
  styleUrls: ['./edit-profile-data-form.component.scss'],
})
export class EditProfileDataFormComponent implements OnInit {
  @Input() accountTypeDict!: IAccountType[];

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
  // doda onDestroy
  ngOnInit() {
    // console.log(this.emailCtrl);

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

    console.log(this.userNameCtrl);
    this.editFormCtrl.valueChanges
      .pipe(
        delay(500),
        // switchMap((value) => value),
        map((value) => {
          if (this.editFormCtrl.valid) {
            console.log(value);
            this.dataApi.formData$.next(value);
          }
        })
      )
      .subscribe();
  }

  onSubmit(formData: any) {
    console.log(formData);
  }

  // get nipNumberCtrl() {
  //   return this.editFormCtrl.get(['nipNumber']) as FormControl;
  // }
}
