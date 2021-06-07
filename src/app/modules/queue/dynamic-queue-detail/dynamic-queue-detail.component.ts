import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/core/domain/contacts/contacts.models';
import { Normative } from 'src/app/core/domain/normatives/normatives.models';
import { Organization } from 'src/app/core/domain/organizations/organizations.models';
import { QueueModel, QueueStatus } from 'src/app/core/domain/queue/queue.models';
import { User } from 'src/app/core/domain/users/users.models';
import { CommonGridAbstractDetails } from 'src/app/core/models/common-details.abstract';
import { ContactState } from 'src/app/core/stores/contacts/contacts.reducers';
import { NormativesState } from 'src/app/core/stores/normatives/normatives.reducers';
import { OrganizationState } from 'src/app/core/stores/organizations/organizations.reducers';
import { QueueState } from 'src/app/core/stores/queue/queue.reducers';
import * as actions from 'src/app/core/stores/queue/queue.actions';
import * as contactActions from 'src/app/core/stores/contacts/contacts.actions';
import * as normativesActions from 'src/app/core/stores/normatives/normatives.actions';
import * as organizationsActions from 'src/app/core/stores/organizations/organizations.actions';

@Component({
  selector: 'app-dynamic-queue-detail',
  templateUrl: './dynamic-queue-detail.component.html',
  styleUrls: ['./dynamic-queue-detail.component.scss']
})
export class DynamicQueueDetailComponent extends CommonGridAbstractDetails<QueueModel> implements OnInit, OnDestroy {

	private subscriptions: Subscription[] = [];
	public queue: QueueModel = null;
	public queueStatuses: QueueStatus[] = [];
	public organizations: Organization[] = [];
	public contacts: Contact[] = [];
	public normatives: Normative[] = [];
	public consultants: User[] = [];
	public auditors: User[] = [];
	
	constructor(
		private store: Store<{ 
			queue: QueueState, 
			organization: OrganizationState, 
			contact: ContactState, 
			normatives: NormativesState,
			
		}>,
		public formBuilder: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<DynamicQueueDetailComponent>
		) {
		super(formBuilder);		
	}

	ngOnInit(): void {
		this.loadComponent();
		this.loadDropdowns();
		this.buildQueueForm();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	public loadComponent(): void {
		this.queue = this.data ? { ...this.data['item'] } : null;
		this.isEditing = this.data ? this.data['isEditing'] : false;
		this.isCreating = this.data ? this.data['isCreating'] : false;
	}

	public onSaveChanges(): void {
		if(this.isEditing) {
		this.store.dispatch(actions.editQueue({ payload: this.getFormValue(), id: this.queue.id }));
		} else if(this.isCreating) {
		this.store.dispatch(actions.createQueue({ payload: this.getFormValue() }));
		}
		this.store.dispatch(actions.onSuccess());
		this.dialogRef.close();
	}

	private buildQueueForm(): void {
		const form: any = {
			statusId: ['', [Validators.required]],
			contactId: ['', Validators.required],
			normativeId: ['', Validators.required],
			organizationId: ['', Validators.required],
			consultantId: ['', Validators.required],
			auditorId: ['', Validators.required],
		}
		this.queue ? super.buildForm(form, this.queue) : super.buildForm(form);
	}

	private loadDropdowns(): void {

		this.subscriptions.push(this.store.pipe(select(store => store.queue.queueStatuses)).subscribe(res => this.queueStatuses = res));
		this.subscriptions.push(this.store.pipe(select(store => store.organization.organizations)).subscribe(res => this.organizations = res));
		this.subscriptions.push(this.store.pipe(select(store => store.contact.contacts)).subscribe(res => this.contacts = res));
		this.subscriptions.push(this.store.pipe(select(store => store.normatives.normatives)).subscribe(res => this.normatives = res));


		this.store.dispatch(actions.loadQueueStatuses());
		this.store.dispatch(organizationsActions.loadOrganizations());
		this.store.dispatch(contactActions.loadContacts());
		this.store.dispatch(normativesActions.loadNormatives());

	}

}
