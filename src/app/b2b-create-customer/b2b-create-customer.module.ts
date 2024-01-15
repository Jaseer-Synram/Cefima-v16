import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { B2bCreateCustomerRoutingModule } from './b2b-create-customer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { B2bCreateCustomerComponent } from './b2b-create-customer.component';


@NgModule({
  declarations: [
    B2bCreateCustomerComponent
  ],
  imports: [
    CommonModule,
    B2bCreateCustomerRoutingModule,
    SharedModule
  ]
})
export class B2bCreateCustomerModule { }
