import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

const routes: Routes = [
  { path: 'enat', 
    component: AuthComponent, 
    children: [
      { path: 'signin', component: SignInComponent }
    ] 
  },
  { path: '', pathMatch: 'full', redirectTo: 'enat/signin' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
