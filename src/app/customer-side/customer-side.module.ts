import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerSideRoutingModule } from './customer-side-routing.module';
import { CustomerSideComponent } from './customer-side.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CustomerSideComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CustomerSideRoutingModule
  ]
})
export class CustomerSideModule { }
