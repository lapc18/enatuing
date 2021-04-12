import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NormativesRoutingModule } from './normatives-routing.module';
import { NormativesComponent } from './normatives.component';


@NgModule({
  declarations: [
    NormativesComponent
  ],
  imports: [
    CommonModule,
    NormativesRoutingModule
  ]
})
export class NormativesModule { }
