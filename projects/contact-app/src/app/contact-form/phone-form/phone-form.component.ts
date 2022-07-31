import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-phone-form',
  templateUrl: './phone-form.component.html',
  styleUrls: ['./phone-form.component.scss'],
})
export class PhoneFormComponent implements OnInit {
  @Input()
  phoneControl!: FormControl;

  constructor() {}

  ngOnInit(): void {}
}
