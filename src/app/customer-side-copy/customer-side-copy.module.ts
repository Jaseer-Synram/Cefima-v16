import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerSideCopyRoutingModule } from './customer-side-copy-routing.module';
import { CustomerSideCopyComponent } from './customer-side-copy.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CustomerSideCopyComponent
  ],
  imports: [
    CommonModule,
    CustomerSideCopyRoutingModule,
    SharedModule,
    
  ]
})
export class CustomerSideCopyModule { }
