import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-colorpicker-form',
  templateUrl: './colorpicker-form.component.html',
  styleUrls: ['./colorpicker-form.component.scss'],
})
export class ColorpickerFormComponent implements OnInit {
  constructor() {}

  @Input() parentForm!: FormGroup;
  @Output() selectedColorEmitted = new EventEmitter<string>();
  color = '#bd5454';

  get colorPickerCtrl() {
    return this.parentForm.get(['color']) as FormControl;
  }

  ngOnInit(): void {
    this.selectedColorEmitted.emit(this.color);
  }

  handleColorChange() {
    this.selectedColorEmitted.emit(this.color);
  }
}
