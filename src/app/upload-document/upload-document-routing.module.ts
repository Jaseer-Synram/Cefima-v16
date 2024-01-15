import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadDocumentComponent } from './upload-document.component';

const routes: Routes = [
  {
    path: '',
    component: UploadDocumentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadDocumentRoutingModule { }
