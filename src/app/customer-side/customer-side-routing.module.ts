import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth-guard.service';
import { CustomerSideComponent } from './customer-side.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerSideComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['customer'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerSideRoutingModule { }
