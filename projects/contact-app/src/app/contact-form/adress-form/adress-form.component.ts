import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adress-form',
  templateUrl: './adress-form.component.html',
  styleUrls: ['./adress-form.component.scss'],
})
export class AdressFormComponent implements OnInit {
  @Input()
  parentForm!: FormGroup;

  get streetNameCtrl() {
    return this.parentForm.get([
      'adressAdditionalInfo',
      'street',
    ]) as FormControl;
  }

  get streetNumberCtrl() {
    return this.parentForm.get([
      'adressAdditionalInfo',
      'streetNumber',
    ]) as FormControl;
  }

  get homeNumberCtrl() {
    return this.parentForm.get([
      'adressAdditionalInfo',
      'homeNumber',
    ]) as FormControl;
  }

  constructor() {}

  ngOnInit(): void {
    console.log(this.streetNameCtrl);
  }
}
