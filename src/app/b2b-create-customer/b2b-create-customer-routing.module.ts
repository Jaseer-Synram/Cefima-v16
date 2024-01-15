import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { B2bCreateCustomerComponent } from './b2b-create-customer.component';

const routes: Routes = [
  { path:'',component:B2bCreateCustomerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class B2bCreateCustomerRoutingModule { }
