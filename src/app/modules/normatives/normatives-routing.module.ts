import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NormativesComponent } from './normatives.component';

const routes: Routes = [{ path: '', component: NormativesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NormativesRoutingModule { }
