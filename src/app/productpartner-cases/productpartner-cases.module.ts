import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductpartnerCasesRoutingModule } from './productpartner-cases-routing.module';
import { ProductpartnerCasesComponent } from './productpartner-cases.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProductpartnerCasesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductpartnerCasesRoutingModule
  ]
})
export class ProductpartnerCasesModule { }
