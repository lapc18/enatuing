import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'contacts', loadChildren: () => import('./modules/contacts/contacts.module').then(m => m.ContactsModule) }, { path: 'users', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule) }, { path: 'normatives', loadChildren: () => import('./modules/normatives/normatives.module').then(m => m.NormativesModule) }, { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) }, { path: 'metrics', loadChildren: () => import('./modules/metrics/metrics.module').then(m => m.MetricsModule) }, { path: 'certifications', loadChildren: () => import('./modules/certifications/certifications.module').then(m => m.CertificationsModule) }, { path: 'queue', loadChildren: () => import('./modules/queue/queue.module').then(m => m.QueueModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
