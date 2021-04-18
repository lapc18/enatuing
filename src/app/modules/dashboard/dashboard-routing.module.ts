import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
      { path: 'contacts', loadChildren: () => import('../contacts/contacts.module').then(m => m.ContactsModule) }, 
      { path: 'users', loadChildren: () => import('../users/users.module').then(m => m.UsersModule) }, 
      { path: 'normatives', loadChildren: () => import('../normatives/normatives.module').then(m => m.NormativesModule) }, 
      { path: 'auth', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule) }, 
      { path: 'metrics', loadChildren: () => import('../metrics/metrics.module').then(m => m.MetricsModule) }, 
      { path: 'certifications', loadChildren: () => import('../certifications/certifications.module').then(m => m.CertificationsModule) }, 
      { path: 'queue', loadChildren: () => import('../queue/queue.module').then(m => m.QueueModule) },
      { path: 'organizations', loadChildren: () => import('../organization/organization.module').then(m => m.OrganizationModule) },
      { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
