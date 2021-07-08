import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../domain/users/users.models';
import { USER } from '../models/constants.model';
import { AuthState } from '../stores/auth/auth.reducer';
import * as actions from 'src/app/core/stores/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	public user: User = null;
	public tkn: string = '';

	constructor(
		private router: Router,
		private store: Store<{ auth: AuthState }>
	) {
		this.store.pipe(select(state => state.auth.currentUser)).subscribe(res => this.user = res);
		this.store.pipe(select(state => state.auth.tkn)).subscribe(res => this.tkn = res);
	}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

		if (!this.user || !this.tkn) {
			const lastUser: { payload: User, tkn: string } = JSON.parse(localStorage.getItem(USER));
			if(lastUser && lastUser.payload && lastUser.tkn) {
				this.store.dispatch(actions.onLoginSuccess({ payload: lastUser.payload, tkn: lastUser.tkn}))
				return true;
			}
			this.router.navigate(['auth/enat/signin']);
			return false;
		}		
		return true;
	}  
}
