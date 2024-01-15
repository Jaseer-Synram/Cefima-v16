import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth-guard.service';
import { ConsultingComponent } from './consulting.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultingComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['Superadmin', 'admin', 'b2b', 'employee', 'customer'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultingRoutingModule { }
