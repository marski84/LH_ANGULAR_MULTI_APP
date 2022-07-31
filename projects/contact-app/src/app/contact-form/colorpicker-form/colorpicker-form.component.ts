import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-colorpicker-form',
  templateUrl: './colorpicker-form.component.html',
  styleUrls: ['./colorpicker-form.component.scss'],
})
export class ColorpickerFormComponent implements OnInit {
  constructor() {}
  @Input() set bgcColor(bgcColor: string | undefined) {
    if (bgcColor === undefined) {
      this.color = '#846f6f';
      return;
    }
    this.color = bgcColor;
  }
  @Output() selectedColorEmitted = new EventEmitter<string>();
  color!: string;

  ngOnInit(): void {
    this.selectedColorEmitted.emit(this.color);
  }

  handleColorChange() {
    this.selectedColorEmitted.emit(this.color);
  }
}
