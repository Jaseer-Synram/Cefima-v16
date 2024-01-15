import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultingRoutingModule } from './consulting-routing.module';
import { ConsultingComponent } from './consulting.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ConsultingComponent
  ],
  imports: [
    CommonModule,
    ConsultingRoutingModule,
    SharedModule
  ]
})
export class ConsultingModule { }
