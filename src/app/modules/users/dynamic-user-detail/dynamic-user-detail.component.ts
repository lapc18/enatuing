import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Role, User } from 'src/app/core/domain/users/users.models';
import { CommonGridAbstractDetails } from 'src/app/core/models/common-details.abstract';
import { UserState } from 'src/app/core/stores/users/users.reducers';
import * as actions from 'src/app/core/stores/users/users.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dynamic-user-detail',
  templateUrl: './dynamic-user-detail.component.html',
  styleUrls: ['./dynamic-user-detail.component.scss']
})
export class DynamicUserDetailComponent extends CommonGridAbstractDetails<User> implements OnInit, OnDestroy {

	private subscriptions: Subscription[] = [];
	public user: User = null;
	public roles: Role[] = [];
	public selectedRoles: string[] = [];
	public isLoading:boolean = false;

	constructor(
		private changeDetector: ChangeDetectorRef,
		private store: Store<{users: UserState}>,
		public formBuilder: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<DynamicUserDetailComponent>
	) {
		super(formBuilder);
		
	}

	ngOnInit(): void {		
		this.loadComponent();
		this.subscriptions.push(this.store.pipe(select(store => store.users.roles)).subscribe(res => this.roles = res));
		this.subscriptions.push(this.store.pipe(select(store => store.users.isLoading)).subscribe(res => this.isLoading = res ));
		this.subscriptions.push(this.store.pipe(select(store => store.users.selectedUser)).subscribe(res => {
			this.user = res;
			this.selectedRoles = this.user ? this.user.roles : [];
			this.buildUserForm();
		}));
		this.changeDetector.detectChanges();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
		this.store.dispatch(actions.clearUserSelected());
	}

	public loadComponent(): void {
		this.user = this.data ? { ...this.data['user'] } : null;
		this.isEditing = this.data ? this.data['isEditing'] : false;
		this.isCreating = this.data ? this.data['isCreating'] : false;
	}

	public onSaveChanges(): void {
		let user:User = { id: this.user.id };
		Object.assign(user, this.getFormValue());

		let roles:Role[] = [];
		roles = this.roles.filter(x => this.selectedRoles.find(r => r == x.id));
		user.roles = roles;

		if(this.isEditing) {
			if(user.roles.length != this.user.roles.length) {
				this.store.dispatch(actions.updateUserRoles({ id: user.id, payload: roles }));
			}	
		} else if(this.isCreating) {
			this.store.dispatch(actions.createUser({ payload: user }));
		}
		this.dialogRef.close();
	}

	private buildUserForm(): void {
		const form: any = {
			name: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			roles: [this.selectedRoles, [Validators.required]],
		}
		this.user ? super.buildForm(form, this.user) : super.buildForm(form);
	}

}