import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Contact } from 'src/app/core/domain/contacts/contacts.models';
import { Normative } from 'src/app/core/domain/normatives/normatives.models';
import { Organization } from 'src/app/core/domain/organizations/organizations.models';
import { Queue, QueueModel, QueueStatus } from 'src/app/core/domain/queue/queue.models';
import { User } from 'src/app/core/domain/users/users.models';
import { CommonGridAbstractDetails } from 'src/app/core/models/common-details.abstract';
import { ContactState } from 'src/app/core/stores/contacts/contacts.reducers';
import { NormativesState } from 'src/app/core/stores/normatives/normatives.reducers';
import { OrganizationState } from 'src/app/core/stores/organizations/organizations.reducers';
import { QueueState } from 'src/app/core/stores/queue/queue.reducers';
import { AuthState } from 'src/app/core/stores/auth/auth.reducer';
import * as actions from 'src/app/core/stores/queue/queue.actions';
import * as contactActions from 'src/app/core/stores/contacts/contacts.actions';
import * as normativesActions from 'src/app/core/stores/normatives/normatives.actions';
import * as organizationsActions from 'src/app/core/stores/organizations/organizations.actions';
import * as authActions from 'src/app/core/stores/auth/auth.actions';
import { map, startWith } from 'rxjs/operators';

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

	public filteredNormatives: Observable<Normative[]>;
	
	constructor(
		private store: Store<{ 
			queue: QueueState, 
			organization: OrganizationState, 
			contact: ContactState, 
			normatives: NormativesState,
			auth: AuthState
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

		let queue:any = {};
		let normative:Normative = {};
		let contact:Contact = {};
		let organization:Organization = {};
		let consultant:User = {};
		let auditor:User = {};
		let status:QueueStatus = {};
		
		Object.assign(queue, this.getFormValue());

		//{{item.description}}-{{item.publishetAt}}
		let normativeLabel: string = this.formGroup.controls['normativeId'].value as string;
		normative = this.normatives.find(x => (x.description + '-' + x.publishetAt).includes(normativeLabel)) || {}
		contact = this.contacts.find(x => (x.id as string).includes(queue.contactId || '')) || {};
		organization = this.organizations.find(x => (x.id as string).includes(queue.organizationId || '')) || {};
		consultant = this.consultants.find(x => (x.id as string).includes(queue.consultantId || '')) || {};
		auditor = this.auditors.find(x => (x.id as string).includes(queue.auditorId || '')) || {};
		status = this.queueStatuses.find(x => (x.id as string).includes(queue.statusId || '')) || {};

		const queueModel:any = {
			auditorId: auditor.id || '',
			consultantId: consultant.id || '',
			normativeId: normative.id || '',
			contactId: contact.id || '',
			statusId: status.id || '',
			organizationId: organization.id || ''
		}		

		console.log(queueModel)

		if(this.isEditing) {
			this.store.dispatch(actions.editQueue({ payload: queueModel, id: this.queue.id }));
		} else if(this.isCreating) {
			this.store.dispatch(actions.createQueue({ payload: queueModel }));
		}
		this.store.dispatch(actions.onSuccess());
		this.data && this.data.callback ? this.data.callback() : void 0;
		this.dialogRef.close();
	}

	private buildQueueForm(): void {
		const form: any = {
			statusId: ['', [Validators.required]],
			contactId: ['', [Validators.required]],
			normativeId: ['', [Validators.required]],
			organizationId: ['', [Validators.required]],
			startDate: ['', [Validators.required]],
			endDate: ['', [Validators.required]],
		}
		this.queue ? super.buildForm(form, this.queue) : super.buildForm(form);
	}

	private loadDropdowns(): void {
		this.subscriptions.push(this.store.pipe(select(store => store.queue.queueStatuses)).subscribe(res => this.queueStatuses = res));
		this.subscriptions.push(this.store.pipe(select(store => store.organization.organizations)).subscribe(res => this.organizations = res));
		this.subscriptions.push(this.store.pipe(select(store => store.contact.contacts)).subscribe(res => this.contacts = res));
		this.subscriptions.push(this.store.pipe(select(store => store.normatives.normatives)).subscribe(res => {
			this.normatives = res;
			this.addFilters();
		}));
		this.subscriptions.push(this.store.pipe(select(store => store.auth.users)).subscribe((res: User[]) => {
			this.auditors = res.filter(x => x.roles.find(r => (r.name as string).toLowerCase().includes('audit')));
			this.consultants = res.filter(x => x.roles.find(r => (r.name as string).toLowerCase().includes('consult')));
		}));

		this.store.dispatch(actions.loadQueueStatuses());
		this.store.dispatch(organizationsActions.loadOrganizations());
		this.store.dispatch(contactActions.loadContacts());
		this.store.dispatch(normativesActions.loadNormatives());
		this.store.dispatch(authActions.loadUsers());
	}

	private addFilters(): void {
		this.formGroup && this.formGroup.controls ? this.filteredNormatives = this.formGroup.controls['normativeId'].valueChanges.pipe(
			startWith(''),
			map(value => this.filterByNortic(value))
		) : void 0;
	}

	private filterByNortic(value: string): Normative[] {
		const filterValue = value.toLowerCase();	
		return this.normatives.filter(option => option.description.toLowerCase().includes(filterValue) || option.publishetAt.toString().toLowerCase().includes(filterValue));
	  }

}
