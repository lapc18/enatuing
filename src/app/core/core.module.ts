import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JustOkComponent } from './factory/dialogs/just-ok/just-ok.component';
import { DialogFactory } from './factory/dialogs/dialog.factory';
import { YesOrNoComponent } from './factory/dialogs/yes-or-no/yes-or-no.component';
import { InformationComponent } from './factory/dialogs/information/information.component';
import { WarningComponent } from './factory/dialogs/warning/warning.component';
import { ConfirmationComponent } from './factory/dialogs/confirmation/confirmation.component';



@NgModule({
  declarations: [
    JustOkComponent,
    YesOrNoComponent,
    InformationComponent,
    WarningComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    DialogFactory
  ]
})
export class CoreModule { }
