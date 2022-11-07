import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MaterialModule } from '../material/material.module';
import { FileUploadContainerComponent } from './file-upload-container/file-upload-container.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetworkInterceptor } from 'projects/upload-app/network.interceptor';

@NgModule({
  declarations: [FileUploadComponent, FileUploadContainerComponent],
  imports: [CommonModule, MaterialModule, HttpClientModule],
  exports: [FileUploadContainerComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true,
    },
  ],
})
export class FileUploadModule {}
