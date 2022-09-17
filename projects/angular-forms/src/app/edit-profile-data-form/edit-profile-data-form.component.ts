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
  tap,
  switchMap,
  Subscription,
  debounceTime,
  takeUntil,
  Subject,
  filter,
} from 'rxjs';
import { FakeApiService } from '../services/fake-api.service';
import { ValidateNip } from '../../../../modules/shared/custom-validators/nip.validator';

@Component({
  selector: 'edit-profile-data-form',
  templateUrl: './edit-profile-data-form.component.html',
  styleUrls: ['./edit-profile-data-form.component.scss'],
})
export class EditProfileDataFormComponent implements OnInit, OnDestroy {
  @Input() accountTypeDict!: IAccountType[];
  private onDestroy$: Subject<void> = new Subject<void>();

  editDataForm = this.fb.group({
    userName: ['', Validators.required],
    email: ['', Validators.required],
    accountType: ['', Validators.required],
    nipNumberCustom: [''],
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

  get customNipCtrl() {
    return this.editFormCtrl.get(['nipNumberCustom']) as FormControl;
  }

  constructor(private fb: FormBuilder, private dataApi: FakeApiService) {}

  ngOnInit() {
    this.accountTypeCtrl.valueChanges
      .pipe(tap((ctrlValue) => this.handleAccountTypeControl(ctrlValue)))
      .subscribe();

    // [1,2,3,4,5]
    //przefiltruj .filter(v => {
    //if( v> 3){return v*2}
    // })
    // pomnóż *2

    // zmiana wartości na 1 => strzał do backendu
    // kolejna zmiana ale po 0.5s

    // kalkulacja na backendzie 5s

    // swtichMap => 1raz
    // concatMap => 2raz 0.5s 1s 5.5s 10.5s
    // mergeMap => 2raz 0.5s 1s 5.5s 6s
    this.editFormCtrl.valueChanges
      .pipe(
        takeUntil(this.onDestroy$),
        debounceTime(500),
        filter(() => this.editFormCtrl.valid),
        switchMap((data) => this.dataApi.sendFormData(data))
      )
      .subscribe();

    //Output => jeżeli tylko parent jest zainteresowany
    //Subject => jeżeli różne komponenty się intereują
  }

  handleAccountTypeControl(controlSelectedValue: string) {
    // można bezpieczny switch
    if (controlSelectedValue === 'company') {
      const nipNumber = this.fb.control('', [
        Validators.required,
        Validators.maxLength(10),
        ValidateNip,
      ]);

      this.editFormCtrl.addControl('nipNumber', nipNumber);
    } else {
      this.editFormCtrl.removeControl('nipNumber');
    }
  }

  onSubmit() {
    console.log(this.editDataForm.value);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
