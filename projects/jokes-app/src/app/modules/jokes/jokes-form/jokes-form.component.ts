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
    category: ['', Validators.required],
    type: ['', Validators.required],
    blacklist: [''],
  });

  get categoryFormCtrl() {
    return this.jokesForm.get(['category']) as FormControl;
  }

  get jokeTypeCtrl() {
    return this.jokesForm.get(['type']) as FormControl;
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

  jokeTypes = [
    { value: 'single', viewValue: 'Single' },
    { value: 'twopart', viewValue: 'Twopart' },
  ];

  ngOnInit() {}

  onSubmit() {
    console.log(this.jokesForm.value);
  }
}
