import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { User } from 'src/app/core/domain/users/users.models';
import { DialogFactory } from 'src/app/core/factory/dialogs/dialog.factory';
import { CommonAbstractGrid } from 'src/app/core/models/common-grid.abstract';
import { columnSettings, FileType } from 'src/app/core/models/enat.models';
import { ExportService } from 'src/app/core/services/export.service';
import { UserState } from 'src/app/core/stores/users/users.reducers';
import * as actions from 'src/app/core/stores/users/users.actions';
import { DynamicUserDetailComponent } from './dynamic-user-detail/dynamic-user-detail.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends CommonAbstractGrid<User> implements OnInit, OnDestroy {

	public allowedRoles: { create?: string[], edit?: string[], remove?: string[] } = {
		create: ['admin', 'gerent', 'audit', 'supervisor'],
		edit: ['admin', 'gerent', 'audit', 'supervisor'],
		remove: ['admin', 'gerent'],
	};

	constructor(
		private dialog: MatDialog,
		private store: Store<{ users: UserState }>,
		public dialogFactory: DialogFactory,
		public exportService: ExportService,
		private changeDetector: ChangeDetectorRef
	) {
		super(columnSettings.user);
		this.data$ = this.store.pipe(select(state => state.users.users));
		this.isLoading$ = this.store.pipe(select(state => state.users.isLoading));
	}

	ngOnInit(): void {
		this.loadData();
		this.changeDetector.detectChanges();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	  }

	public loadData(): void {
		this.store.dispatch(actions.loadUsers());
		this.store.dispatch(actions.loadRoles());
		this.subscriptions.push(this.isLoading$.subscribe(res => this.isLoading = res));
		this.subscriptions.push(this.data$.subscribe((res: User[]) => this.data = res));		
	}

	public onCreate(): void {
		this.dialog.open(DynamicUserDetailComponent, {
			data: { 
				isCreating: true, 
				callback:() => {
					this.store.dispatch(actions.loadUsers());
				} 
			},
			minWidth: '50%',
			minHeight: '60vh',
			hasBackdrop: true,
			disableClose: true,
		});
	}

	public onEdit(item: User): void {
		this.store.dispatch(actions.loadUser({payload: item.email}));
		this.dialog.open(DynamicUserDetailComponent, {
			data: {
				isEditing: true,
				user: item,
				callback:() => {
					this.store.dispatch(actions.loadUsers());
				}
			},
			minWidth: '50%',
			minHeight: '60vh',
			hasBackdrop: true,
			disableClose: true,
		});
	}

	public onDelete(item: User): void {
		this.dialogFactory.confirmation({
		message: '¿Está seguro que desea eliminar este usuario?',
		callback:() => {
				this.store.dispatch(actions.removeUser({ payload: item, id: item.id}));
				this.store.dispatch(actions.loadUsers());
			}
		});

	}

	public onSeeDetails(item: User): void {
		this.dialog.open(DynamicUserDetailComponent, {
			data: {
				isEditing: false,
				user: item
			},
			minWidth: '50%',
			minHeight: '60vh',
			hasBackdrop: true
		}); 
	}

	public onExport(fileType: FileType): void {
		const fileName: string = `some-name-here-${Date.now()}`;
		this.exportService.saveToFile(fileType, this.data, fileName);
	}

}