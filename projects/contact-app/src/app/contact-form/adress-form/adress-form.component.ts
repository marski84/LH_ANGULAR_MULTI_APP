import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adress-form',
  templateUrl: './adress-form.component.html',
  styleUrls: ['./adress-form.component.scss'],
})
export class AdressFormComponent implements OnInit {
  @Input()
  adressFromControl!: FormGroup;

  get streetNameCtrl() {
    return this.adressFromControl.get(['street']) as FormControl;
  }

  get streetNumberCtrl() {
    return this.adressFromControl.get(['streetNumber']) as FormControl;
  }

  get homeNumberCtrl() {
    return this.adressFromControl.get(['homeNumber']) as FormControl;
  }

  constructor() {}

  ngOnInit(): void {}
}
