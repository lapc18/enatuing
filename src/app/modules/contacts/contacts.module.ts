import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { DynamicDetailContactComponent } from './dynamic-detail-contact/dynamic-detail-contact.component';


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
  ]
})
export class ContactsModule { }
