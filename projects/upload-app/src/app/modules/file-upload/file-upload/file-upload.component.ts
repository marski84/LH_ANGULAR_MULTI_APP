import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { UploadService } from '../upload.service';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  constructor(
    private uploadService: UploadService,
    private dialog: MatDialog
  ) {}

  uploadedFiles: any[] = [];
  maxFileSize = 10485760;
  acceptedFiles = ['pdf', 'png', 'jpg', 'doc', 'docx', '.7z'];

  selectFormControl = new FormControl('', Validators.required);

  animals = [
    { name: 'Kwestionariusz A' },
    { name: 'Kwestionariusz okok' },
    { name: 'Kwestionariusz barba' },
    { name: 'Kwestionariusz slusarz' },
  ];

  fileName = '';

  ngOnInit(): void {
    this.uploadedFiles = this.uploadService.uploadedFiles;
  }

  onFileSelected(event: any) {
    console.log(event);

    const file: File = event.target.files[0];
    const documentType = this.selectFormControl.value;

    if (file.size >= this.maxFileSize) {
      console.log('za duy plik');
      this.openFileTooBigModal();
      return;
    }

    const fileType = file.name.slice(file.name.length - 3);
    console.log(fileType);

    const isFileValid = this.acceptedFiles.some((acceptedFileType) => {
      return acceptedFileType === fileType;
    });

    if (!isFileValid) {
      this.openInvalidFileFormatModal();
      return;
    }

    if (file) {
      this.fileName = file.name;
      this.uploadService.handleFileUpload({
        attachedFile: file,
        document: documentType,
      });
      this.selectFormControl.reset();
    }
  }

  private openFileTooBigModal() {
    const modalConfig = {
      autoFocus: true,
      disableClose: true,
      hasBackdrop: true,
      width: '400px',
      height: '200px',
    };
    const dialogRef = this.dialog.open(ModalComponent, modalConfig);
    dialogRef.componentInstance.title = 'Plik jest za duzy!';

    dialogRef.componentInstance.content = 'Maksymalny rozmiar pliku to 10mb!';
    dialogRef.afterClosed().subscribe(() => this.selectFormControl.reset());
  }

  private openInvalidFileFormatModal() {
    const modalConfig = {
      autoFocus: true,
      disableClose: true,
      hasBackdrop: true,
      width: '400px',
      height: '200px',
    };
    const dialogRef = this.dialog.open(ModalComponent, modalConfig);
    dialogRef.componentInstance.title = 'Nieprawidłowy format pliku';

    dialogRef.componentInstance.content =
      'Akceptowalne formaty to .doc, .docx, .jpg, .pdf .png';
    dialogRef.afterClosed().subscribe(() => this.selectFormControl.reset());
  }
}
