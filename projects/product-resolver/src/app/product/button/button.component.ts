import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() buttonName = '';
  @Input() eventName = '';
  @Input() disabled = false;
  @Output() buttonClickedEmitted = new EventEmitter();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {}

  handleClick() {
    this.buttonClickedEmitted.emit(this.eventName);
  }
}
