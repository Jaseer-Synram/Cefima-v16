import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { B2bRoutingModule } from './b2b-routing.module';
import { SharedModule } from '../shared/shared.module';
import { B2bComponent } from './b2b.component';
import { UpdatedProfileComponent } from '../updated-profile/updated-profile.component';


@NgModule({
  declarations: [
    B2bComponent,
    UpdatedProfileComponent
  ],
  imports: [
    CommonModule,
    B2bRoutingModule,
    SharedModule
  ]
})
export class B2bModule { }
