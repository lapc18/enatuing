import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueueRoutingModule } from './queue-routing.module';
import { QueueComponent } from './queue.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DynamicQueueDetailComponent } from './dynamic-queue-detail/dynamic-queue-detail.component';
import { AssignmentComponent } from './assignment/assignment.component';


@NgModule({
  declarations: [
    QueueComponent,
    DynamicQueueDetailComponent,
    AssignmentComponent
  ],
  imports: [
    CommonModule,
    QueueRoutingModule,
    CoreModule,
    SharedModule
  ]
})
export class QueueModule { }
