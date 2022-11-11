import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MaterialModule } from '../material/material.module';
import { FileUploadContainerComponent } from './file-upload-container/file-upload-container.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetworkInterceptor } from 'projects/upload-app/network.interceptor';
import { ModalComponent } from './modal/modal.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxMatSelectModule } from 'ngx-mat-select';

@NgModule({
  declarations: [
    FileUploadComponent,
    FileUploadContainerComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    NgxMatSelectSearchModule,
    NgxMatSelectModule.forRoot({}),
  ],
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
