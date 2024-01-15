import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { B2bDashboardComponent } from './b2b-dashboard.component';
import { AuthGuardService } from '../auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: B2bDashboardComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['Superadmin', 'admin', 'b2b'] },
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class B2bDashboardRoutingModule { }
