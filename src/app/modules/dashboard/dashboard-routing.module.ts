import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'contacts', loadChildren: () => import('../contacts/contacts.module').then(m => m.ContactsModule) },
      { path: 'users', loadChildren: () => import('../users/users.module').then(m => m.UsersModule) },
      { path: 'normatives', loadChildren: () => import('../normatives/normatives.module').then(m => m.NormativesModule) },
      { path: 'auth', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule) },
      { path: 'metrics', loadChildren: () => import('../metrics/metrics.module').then(m => m.MetricsModule) },
      { path: 'certifications', loadChildren: () => import('../certifications/certifications.module').then(m => m.CertificationsModule) },
      { path: 'queue', loadChildren: () => import('../queue/queue.module').then(m => m.QueueModule) },
      { path: 'organizations', loadChildren: () => import('../organization/organization.module').then(m => m.OrganizationModule) },
      { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) },
<<<<<<< HEAD
      { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomeModule) },
      { path: '', pathMatch: 'full', redirectTo: 'home' }
    ],
  },
=======
      { path: 'statistics', loadChildren: () => import('../statistics/statistics.module').then(m => m.StatisticsModule) }
    ]
  }
>>>>>>> 65e88f266d49485069bf32d8a72857baf3e516f2
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
