import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { DynamicOrganizationDetailComponent } from './dynamic-organization-detail/dynamic-organization-detail.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    OrganizationComponent,
    DynamicOrganizationDetailComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    SharedModule,
    CoreModule
  ]
})
export class OrganizationModule { }
