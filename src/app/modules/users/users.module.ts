import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { DynamicUserDetailComponent } from './dynamic-user-detail/dynamic-user-detail.component';


@NgModule({
  declarations: [
    UsersComponent,
    DynamicUserDetailComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    CoreModule
  ]
})
export class UsersModule { }
