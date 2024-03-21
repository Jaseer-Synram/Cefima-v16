import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductpartnerCasesComponent } from './productpartner-cases.component';

const routes: Routes = [
  {
    path:'',
    component:ProductpartnerCasesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductpartnerCasesRoutingModule { }
