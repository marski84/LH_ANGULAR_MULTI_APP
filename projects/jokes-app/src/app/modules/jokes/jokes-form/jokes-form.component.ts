import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-jokes-form',
  templateUrl: './jokes-form.component.html',
  styleUrls: ['./jokes-form.component.scss'],
})
export class JokesFormComponent implements OnInit {
  @Output() formDataEmitted = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  jokesForm: FormGroup = this.fb.group({
    category: ['', Validators.required],
    type: ['', Validators.required],
    blackList: [''],
  });

  get categoryFormCtrl() {
    return this.jokesForm.get(['category']) as FormControl;
  }

  get jokeTypeCtrl() {
    return this.jokesForm.get(['type']) as FormControl;
  }

  get blackListCtrl() {
    return this.jokesForm.get(['blackList']) as FormControl;
  }

  categories = [
    { value: 'any', viewValue: 'Any kind' },
    { value: 'programming', viewValue: 'Programming' },
    { value: 'misc', viewValue: 'Miscelanious' },
    { value: 'dark', viewValue: 'Dark' },
    { value: 'pun', viewValue: 'Punchline' },
    { value: 'spooky', viewValue: 'Spooky' },
    { value: 'christmas', viewValue: 'Christmas' },
  ];

  jokeTypes = [
    { value: 'single', viewValue: 'Single' },
    { value: 'twopart', viewValue: 'Twopart' },
  ];

  blacklistCategories = [
    { value: 'nsfw', viewValue: 'Work' },
    { value: 'religious', viewValue: 'Religion' },
    { value: 'political', viewValue: 'Politics' },
    { value: 'racist', viewValue: 'Race' },
    { value: 'sexist', viewValue: 'Sex' },
    { value: 'explicit', viewValue: 'Explicit' },
  ];

  ngOnInit() {}

  onSubmit() {
    if (this.jokesForm.valid) {
      this.formDataEmitted.next(this.jokesForm.value);
    }
    return;
  }
}
