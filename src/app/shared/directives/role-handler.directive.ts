import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthState } from 'src/app/core/stores/auth/auth.reducer';
import * as actions from 'src/app/core/stores/auth/auth.actions';
import { User } from 'src/app/core/domain/users/users.models';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[role-handler]'
})
export class RoleHandlerDirective implements OnInit, AfterViewInit, OnDestroy {

	private currentUser:User = null;
	private subscriptions:Subscription[] = [];

	@Input() allowedRoles: string[] = [];

	constructor(
		private elementRef: ElementRef,
		private store: Store<{
		auth: AuthState
		}>
	) { 
		this.subscriptions.push(this.store.pipe(select(store => store.auth.currentUser)).subscribe(res => {
			this.currentUser = res;
		}));
	}

	ngOnInit(): void {
		this.validatePermissions();
	}

	ngAfterViewInit(): void {
		this.validatePermissions();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(s => s.unsubscribe());
	}

	private validatePermissions(): void {
		console.log('on init:', this.allowedRoles);
		if(this.currentUser) {
			!this.hasAllowedRoles() ? this.elementRef.nativeElement.style = 'display:none;' : void 0;
			
		} else {
			this.elementRef.nativeElement.style = 'display:none;'
		}
	}

	private hasAllowedRoles(): boolean {
		let hasRole: boolean = false;
		this.allowedRoles.forEach(x => {
			const role = this.currentUser.roles.find(r => r.name.toLowerCase().includes(x.toLowerCase()));
			if(role) {
				hasRole = true;
			}
		});
		return hasRole;
	}

}
