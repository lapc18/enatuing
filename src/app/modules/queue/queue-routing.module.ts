import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueueComponent } from './queue.component';

const routes: Routes = [
  { path: 'all', component: QueueComponent },
  { path: 'user/:userId', component: QueueComponent },
  { path: 'current', component: QueueComponent },
  { path: 'current/:type', component: QueueComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueueRoutingModule { }
