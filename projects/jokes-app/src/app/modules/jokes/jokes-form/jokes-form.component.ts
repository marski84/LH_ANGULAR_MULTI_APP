import { IjokeForm } from './../models/jokeForm.interface';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DictionaryService } from './dictionary.service';
import { tap } from 'rxjs';
import { ISelectValue } from '../models/selectValue.interface';

@Component({
  selector: 'app-jokes-form',
  templateUrl: './jokes-form.component.html',
  styleUrls: ['./jokes-form.component.scss'],
})
export class JokesFormComponent implements OnInit {
  @Output() formDataEmitted = new EventEmitter<IjokeForm>();
  jokesForm: FormGroup = this.fb.group({
    category: ['', Validators.required],
    type: ['', Validators.required],
    blackList: [''],
  });

  get categoryFormCtrl() {
    return this.jokesForm.get('category') as FormControl;
  }

  get jokeTypeCtrl() {
    return this.jokesForm.get(['type']) as FormControl;
  }

  get blackListCtrl() {
    return this.jokesForm.get(['blackList']) as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private distionaryService: DictionaryService
  ) {}

  categories!: ISelectValue[];
  jokeTypes!: ISelectValue[];
  blacklistCategories!: ISelectValue[];

  ngOnInit() {
    this.distionaryService
      .getCategories()
      .pipe(tap((jokeCategoriers) => (this.categories = jokeCategoriers)))
      .subscribe();

    this.distionaryService
      .getJokeTypes()
      .pipe(tap((jokeTypes) => (this.jokeTypes = jokeTypes)))
      .subscribe();

    this.distionaryService
      .getBlackListCategories()
      .pipe(
        tap(
          (blackListCategories) =>
            (this.blacklistCategories = blackListCategories)
        )
      )
      .subscribe();
  }

  onSubmit() {
    if (this.jokesForm.valid) {
      this.formDataEmitted.emit(this.jokesForm.value);
    }
    return;
  }
}
