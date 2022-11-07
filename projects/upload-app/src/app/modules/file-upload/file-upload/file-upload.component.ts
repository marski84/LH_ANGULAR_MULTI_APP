import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UploadService } from '../upload.service';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  constructor(private uploadService: UploadService) {}

  uploadedFiles: any[] = [];
  maxFileSize = 10485760;

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
