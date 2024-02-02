import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';
import { AuthGuardService } from '../auth-guard.service';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        children: [],
        // canActivate: [AuthGuardService],
      },
      {
        path: 'b2b-dashboard',
        loadChildren: () =>
          import('../b2b-dashboard/b2b-dashboard.module').then(
            (m) => m.B2bDashboardModule
          ),
        canActivate: [AuthGuardService],
      },
      {
        path: 'new-user',
        loadChildren: () =>
          import('../b2b-create-customer/b2b-create-customer.module').then(
            (m) => m.B2bCreateCustomerModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'upload-document',
        loadChildren: () =>
          import("../upload-document/upload-document.module").then(
            (m) => m.UploadDocumentModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'consulting',
        loadChildren: () =>
          import('../consulting/consulting.module').then(
            (m) => m.ConsultingModule
          ),
        canActivate: [AuthGuardService],
        data: { roles: ['Superadmin', 'admin', 'b2b', 'employee', 'customer'] },
      },
      {
        path: 'customer',
        loadChildren: () =>
          import('../customer/customer.module').then((m) => m.CustomerModule),
        canActivate: [AuthGuardService],
        data: { roles: ['Superadmin', 'admin', 'b2b', 'employee', 'customer'] },
      },
      {
        path: 'kunde-home',
        loadChildren: () =>
          import('../customer-side/customer-side.module').then(
            (m) => m.CustomerSideModule
          ),
        canActivate: [AuthGuardService],
        data: { roles: ['customer'] },
      },
      {
        path: 'create-customer',
        loadChildren: () =>
          import('../create-customer/create-customer.module').then(
            (m) => m.CreateCustomerModule
          ),
        canActivate: [AuthGuardService],
        data: { roles: ['customer'] },
      },
      {
        path: 'meine-daten',
        loadChildren: () =>
          import('../main-data/main-data.module').then(
            (m) => m.MainDataModule
          ),
        canActivate: [AuthGuardService],
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
