import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { DynamicDetailContactComponent } from './dynamic-detail-contact/dynamic-detail-contact.component';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    ContactsComponent,
    DynamicDetailContactComponent
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    SharedModule,
    MaterialModule,
    CoreModule
  ]
})
export class ContactsModule { }
