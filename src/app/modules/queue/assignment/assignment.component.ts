import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Queue, QueueModel } from 'src/app/core/domain/queue/queue.models';
import { User } from 'src/app/core/domain/users/users.models';
import { AuthState } from 'src/app/core/stores/auth/auth.reducer';
import { QueueState } from 'src/app/core/stores/queue/queue.reducers';
import * as authActions from 'src/app/core/stores/auth/auth.actions';
import * as queueUserActions from 'src/app/core/stores/queue-user-actions/queue-user.actions';
import { columnSettings, IColumn } from 'src/app/core/models/enat.models';
import { SelectionModel } from '@angular/cdk/collections';
import { QueueAction, QueueUserAction } from 'src/app/core/domain/queue-user/queue-user.model';
import { QueueActionState } from 'src/app/core/stores/queue-user-actions/queue-user.reducers';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit, OnDestroy {

	private auditorAction:QueueAction;
	private consultantAction:QueueAction;
	public consultant:User;
	public auditor:User;
	public auditors:User[] = [];
	public consultants:User[] = [];
	public queue: Queue[] = [];
	public selectedData: SelectionModel<Queue> = new SelectionModel<Queue>(true, []);
	public columns:IColumn[] = columnSettings.assignment;
	public filter: string = '';

	public subscriptions:Subscription[] = [];

	constructor(
		private store: Store<{
			queue: QueueState,
			auth: AuthState,
			queueActions: QueueActionState
		}>
	) { }

	ngOnInit(): void {
		this.loadQueueUserActions();
		this.loadUsers();
		this.loadQueue();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(x => x.unsubscribe());
	}

	private loadUsers(): void {
		this.subscriptions.push(this.store.pipe(select(store => store.auth.users)).subscribe((res: User[]) => {
			this.auditors = res.filter(x => x.roles.find(r => (r.name as string).toLowerCase().includes('audit')));
			this.consultants = res.filter(x => x.roles.find(r => (r.name as string).toLowerCase().includes('consult')));
		}));
		this.store.dispatch(authActions.loadUsers());
	}

	private loadQueueUserActions(): void {
		this.subscriptions.push(this.store.pipe(select(store => store.queueActions.queueActions)).subscribe((res: QueueAction[]) => {
			this.auditorAction = res.find(x => x.name.toLowerCase().includes('audit'));
			this.consultantAction = res.find(x => x.name.toLowerCase().includes('consult'));
		}));
		this.store.dispatch(queueUserActions.loadQueueActions());
	}

	private loadQueue(): void {
		this.subscriptions.push(
		this.store.pipe(select(x => x.queue.queue)).subscribe(x => this.mapQueue(x)));
	}

	private mapQueue(queue: QueueModel[]): void {
		this.queue = queue.map(item => {
				let itemMapped:Queue = {};
				if(item) {
					//{{item.category}}{{item.order}}-{{item.publishetAt}}
					itemMapped.nortic = `${item.normative.category || ''}${item.normative.order || ''}-${item.normative.publishetAt || ''}`;
					itemMapped.organization = `${item.organization.name || ''}-(${item.organization.acronym || ''})`;
					itemMapped.status = `${item.status && item.status.description? item.status.description : ''}`;
					itemMapped.contact = `${item.contact && item.contact.name ? item.contact.name : ''}`;
					itemMapped.id = item.id || '';
					itemMapped.type = item.type || '';
				}
				return itemMapped;
			}
		);
	}

	public assign(): void {

		if(
			this.auditorAction === undefined || 
			this.auditorAction === null ||
			this.consultantAction === undefined ||
			this.consultantAction === null ||
			this.auditor === undefined ||
			this.auditor === null ||
			this.consultant === undefined ||
			this.consultant === null 
		) {
			//TODO: show message
			console.log('there are something null here...')
			return;
		}

		let queue:Queue[] = this.selectedData.selected;


		queue.forEach(x => {
			let auditorAction:QueueUserAction = {
				queueActionId: (this.auditorAction.id as string),
				queueId: x.id,
				user: this.auditor
			}

			let consultantAction:QueueUserAction = {
				queueActionId: (this.consultantAction.id as string),
				queueId: x.id,
				user: this.consultant
			}

			this.store.dispatch(queueUserActions.createQueueUserAction({payload: auditorAction}));
			this.store.dispatch(queueUserActions.createQueueUserAction({payload: consultantAction}));

		});


	}

}
