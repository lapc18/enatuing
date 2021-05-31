import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../domain/users/users.models';
import { TOKEN } from '../models/constants.model';
import { AuthState } from '../stores/auth/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  public user: User = null;

  constructor(
    private router: Router,
    private store: Store<{ auth: AuthState }>
  ) {
    this.store.pipe(select(state => state.auth.user)).subscribe(res => this.user = res);
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = localStorage.getItem(TOKEN);
      if (!this.user || !token) {
        this.router.navigate(['auth/signin']);
        return false;
      }
  
      return true;
  }
  
}
