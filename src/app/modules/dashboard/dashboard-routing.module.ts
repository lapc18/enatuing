import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard],  children: [
      { path: 'contacts', loadChildren: () => import('../contacts/contacts.module').then(m => m.ContactsModule) },
      { path: 'users', loadChildren: () => import('../users/users.module').then(m => m.UsersModule) },
      { path: 'normatives', loadChildren: () => import('../normatives/normatives.module').then(m => m.NormativesModule) },
      { path: 'auth', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule) },
      { path: 'metrics', loadChildren: () => import('../metrics/metrics.module').then(m => m.MetricsModule) },
      { path: 'certifications', loadChildren: () => import('../certifications/certifications.module').then(m => m.CertificationsModule) },
      { path: 'queue', loadChildren: () => import('../queue/queue.module').then(m => m.QueueModule) },
      { path: 'organizations', loadChildren: () => import('../organization/organization.module').then(m => m.OrganizationModule) },
      { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'statistics', loadChildren: () => import('../statistics/statistics.module').then(m => m.StatisticsModule) },
      { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomeModule) },
      { path: '', pathMatch: 'full', redirectTo: 'home' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
