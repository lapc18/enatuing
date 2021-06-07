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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { ContactService } from './services/contacts.service';
import { NormativesService } from './services/normatives.service';
import { CertificationsService } from './services/Certifications.service';
import { QueueService } from './services/Queue.service';
import { OrganizationService } from './services/organizations.service';



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
    CommonModule,
    HttpClientModule
  ],
  exports: [AlertComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    DialogFactory,
    AlertFactory,
    ContactService,
    NormativesService,
    CertificationsService,
    QueueService,
    OrganizationService
  ]
})
export class CoreModule { }
