import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificationsRoutingModule } from './certifications-routing.module';
import { CertificationsComponent } from './certifications.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CertificationsComponent
  ],
  imports: [
    CommonModule,
    CertificationsRoutingModule,
    SharedModule
  ]
})
export class CertificationsModule { }
