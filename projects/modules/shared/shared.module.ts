import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from '../../company-form/src/app/logger.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [{ provide: LoggerService, useClass: LoggerService }],
})
export class SharedModule {}
