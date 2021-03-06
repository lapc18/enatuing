import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificationsRoutingModule } from './certifications-routing.module';
import { CertificationsComponent } from './certifications.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { DynamicCertificationsDetailComponent } from './dynamic-certifications-detail/dynamic-certifications-detail.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    CertificationsComponent,
    DynamicCertificationsDetailComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    CertificationsRoutingModule,
    SharedModule,
    CoreModule
  ]
})
export class CertificationsModule { }
