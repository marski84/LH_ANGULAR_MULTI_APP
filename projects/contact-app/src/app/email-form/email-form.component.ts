import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss'],
})
export class EmailFormComponent implements OnInit {
  @Input()
  parentForm!: FormGroup;

  get contactTypeEmailCtrl() {
    return this.parentForm.get([
      'emailAdditionalInfo',
      'emailAdress',
    ]) as FormControl;
  }

  constructor() {
    // console.log(this.contactTypeEmailCtrl);
  }

  ngOnInit(): void {}
}
