import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UploadService } from '../upload.service';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  constructor(
    private uploadService: UploadService
  ) // private dialogRef: MatDialogRef<any>
  {}

  @ViewChild('fileTooBigModal', { static: false }) fileTooBigModal: any;

  uploadedFiles: any[] = [];
  maxFileSize = 10485760;
  acceptedFiles = ['pdf', 'png', 'jpg', 'doc', 'docx', '.7z'];

  animalControl = new FormControl(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);

  animals = [
    { name: 'Dog', sound: 'Woof!' },
    { name: 'Cat', sound: 'Meow!' },
    { name: 'Cow', sound: 'Moo!' },
    { name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!' },
  ];

  fileName = '';

  ngOnInit(): void {
    this.uploadedFiles = this.uploadService.uploadedFiles;
  }

  onFileSelected(event: any) {
    console.log(event);

    const file: File = event.target.files[0];
    const documentType = this.animalControl.value;

    if (file.size >= this.maxFileSize) {
      console.log('za duy plik');

      return;
    }

    const fileType = file.name.slice(file.name.length - 3);
    console.log(fileType);

    const isFileValid = this.acceptedFiles.some((acceptedFileType) => {
      return acceptedFileType === fileType;
    });

    console.log(isFileValid);

    if (file) {
      this.fileName = file.name;
      this.uploadService.handleFileUpload({
        attachedFile: file,
        document: documentType,
      });
      this.animalControl.reset();
    }
  }
}
