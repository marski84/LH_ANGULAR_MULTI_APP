import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent implements OnInit {
  @Input()
  parentForm!: FormGroup;

  get contactTypeEmailCtrl() {
    return this.parentForm.get([
      'emailAdditionalInfo',
      'emailAdress',
    ]) as FormControl;
  }

  constructor() {
    console.log(this.parentForm);
    // console.log(this.contactTypeEmailCtrl);
  }

  ngOnInit(): void {}
}
