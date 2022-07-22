import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-phone-form',
  templateUrl: './phone-form.component.html',
  styleUrls: ['./phone-form.component.scss'],
})
export class PhoneFormComponent implements OnInit {
  @Input()
  parentForm!: FormGroup;

  get contactTypePhoneCtrl() {
    return this.parentForm.get(['phoneAdditionalInfo']) as FormControl;
  }

  constructor() {}

  ngOnInit(): void {}
}
