import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jokes-form',
  templateUrl: './jokes-form.component.html',
  styleUrls: ['./jokes-form.component.scss'],
})
export class JokesFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  jokesForm: FormGroup = this.fb.group({
    category: this.fb.group({
      any: false,
      programming: false,
      Misc: false,
      Dark: false,
      Pun: false,
      Spooky: false,
      Christmas: false,
    }),
    language: [''],
    blacklist: [''],
  });

  get categoryFormCtrl() {
    return this.jokesForm.get(['category']) as FormGroup;
  }

  get anyTypeCtrl() {
    return this.categoryFormCtrl.get(['any']) as FormControl;
  }

  get languageCtrl() {
    return this.jokesForm.get(['language']) as FormControl;
  }

  get blacklistCtrl() {
    return this.jokesForm.get(['blacklist']) as FormControl;
  }

  categories = [
    'Any',
    'Programming',
    'Misc',
    'Dark',
    'Pun',
    'Spooky',
    'Christmas',
  ];

  ngOnInit() {}

  onSubmit() {
    console.log(this.jokesForm.value);
    console.log(this.jokesForm);
    console.log(this.anyTypeCtrl);
  }
}
