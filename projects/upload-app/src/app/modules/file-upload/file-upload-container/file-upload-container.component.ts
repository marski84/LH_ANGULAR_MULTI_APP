import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';

@Component({
  selector: 'file-upload-container',
  templateUrl: './file-upload-container.component.html',
  styleUrls: ['./file-upload-container.component.scss'],
})
export class FileUploadContainerComponent implements OnInit {
  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {}
}
