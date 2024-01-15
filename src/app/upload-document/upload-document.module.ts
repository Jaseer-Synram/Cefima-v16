import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadDocumentRoutingModule } from './upload-document-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UploadDocumentComponent } from './upload-document.component';


@NgModule({
  declarations: [
    UploadDocumentComponent
  ],
  imports: [
    CommonModule,
    UploadDocumentRoutingModule,
    SharedModule
  ]
})
export class UploadDocumentModule { }
