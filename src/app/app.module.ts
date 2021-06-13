import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { MaterialModule } from './material.module';
import * as reducers from './core/stores/reducers';
import { EffectsModule } from '@ngrx/effects';
import { ContactsEffects } from './core/stores/contacts/contats.effects';
import { CoreModule } from './core/core.module';
import { NormativesEffects } from './core/stores/normatives/normatives.effects';
import { CertificationsEffects } from './core/stores/certifications/certifications.effects';
import { QueueEffects } from './core/stores/queue/queue.effects';
import { OrganizationEffects } from './core/stores/organizations/organization.effects';
import { AuthEffects } from './core/stores/auth/auth.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    StoreModule.forRoot({ 
      auth: reducers.AuthReducer,
      contact: reducers.contactReducer,
      certifications: reducers.certificationReducer,
      organization: reducers.organizationReducer,
      normatives: reducers.normativesReducer,
      queue: reducers.queueReducer,
    }),
    EffectsModule.forRoot([
      ContactsEffects,
      NormativesEffects,
      CertificationsEffects,
      QueueEffects,
      OrganizationEffects,
      AuthEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
