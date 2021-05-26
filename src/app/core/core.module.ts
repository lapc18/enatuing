import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JustOkComponent } from './factory/dialogs/just-ok/just-ok.component';
import { DialogFactory } from './factory/dialogs/dialog.factory';
import { YesOrNoComponent } from './factory/dialogs/yes-or-no/yes-or-no.component';
import { InformationComponent } from './factory/dialogs/information/information.component';
import { WarningComponent } from './factory/dialogs/warning/warning.component';
import { ConfirmationComponent } from './factory/dialogs/confirmation/confirmation.component';
import { AlertComponent } from './factory/alerts/alert/alert.component';
import { AlertFactory } from './factory/alerts/alerts.factory';



@NgModule({
  declarations: [
    JustOkComponent,
    YesOrNoComponent,
    InformationComponent,
    WarningComponent,
    ConfirmationComponent,
    AlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [AlertComponent],
  providers: [
    DialogFactory,
    AlertFactory
  ]
})
export class CoreModule { }
