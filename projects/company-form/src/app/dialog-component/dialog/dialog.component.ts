import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  dialogTitle!: string;
  dialogContent!: string;

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { title: string; content: string }
  ) {
    this.dialogTitle = data.title;
    this.dialogContent = data.content;
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
