import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetricsRoutingModule } from './metrics-routing.module';
import { MetricsComponent } from './metrics.component';


@NgModule({
  declarations: [
    MetricsComponent
  ],
  imports: [
    CommonModule,
    MetricsRoutingModule
  ]
})
export class MetricsModule { }
