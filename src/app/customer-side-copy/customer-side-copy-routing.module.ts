import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerSideCopyComponent } from './customer-side-copy.component';
import { AuthGuardService } from '../auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: CustomerSideCopyComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['customer'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerSideCopyRoutingModule { }
