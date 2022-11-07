import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private httpService: HttpClient) {}

  uploadedFiles: any[] = [];

  handleFileUpload(fileData: any) {
    console.log(fileData);

    const formData = new FormData();

    formData.append(fileData.document.name, fileData.attachedFile.name);

    const upload$ = this.httpService.post('/api/thumbnail-upload', formData);

    upload$.subscribe();

    const handledFile = {
      fileName: fileData.attachedFile.name,
      documentType: fileData.document.name,
    };

    this.uploadedFiles.push(handledFile);
  }
}
