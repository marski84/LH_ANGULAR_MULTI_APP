import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() title?: string;
  @Input() content?: string;

  constructor(private dialogRef: MatDialogRef<ModalComponent>) {}

  ngOnInit(): void {}

  handleClose() {
    this.dialogRef.close({ closed: true });
  }
}
