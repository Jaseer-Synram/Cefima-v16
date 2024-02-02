import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateCustomerRoutingModule } from './create-customer-routing.module';
import { CreateCustomerComponent } from './create-customer.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CreateCustomerComponent
  ],
  imports: [
    CommonModule,
    CreateCustomerRoutingModule,
    SharedModule
  ]
})
export class CreateCustomerModule { }
