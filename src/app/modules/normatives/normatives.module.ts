import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NormativesRoutingModule } from './normatives-routing.module';
import { NormativesComponent } from './normatives.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { DynamicNormativeDetailComponent } from './dynamic-normative-detail/dynamic-normative-detail.component';


@NgModule({
  declarations: [
    NormativesComponent,
    DynamicNormativeDetailComponent
  ],
  imports: [
    CommonModule,
    NormativesRoutingModule,
    SharedModule,
    CoreModule
  ]
})
export class NormativesModule { }
