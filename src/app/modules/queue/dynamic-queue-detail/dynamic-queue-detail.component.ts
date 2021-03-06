import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
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
import { AuthState } from 'src/app/core/stores/auth/auth.reducer';
import * as actions from 'src/app/core/stores/queue/queue.actions';
import * as contactActions from 'src/app/core/stores/contacts/contacts.actions';
import * as normativesActions from 'src/app/core/stores/normatives/normatives.actions';
import * as organizationsActions from 'src/app/core/stores/organizations/organizations.actions';
import * as authActions from 'src/app/core/stores/auth/auth.actions';
import { map, startWith } from 'rxjs/operators';
import * as moment from 'moment';

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


	//Filters section
	public filteredNormatives: Observable<Normative[]>;
	public filteredOrganizations: Observable<Organization[]>;
	public filteredContacts: Observable<Contact[]>;
	public filteredConsultants: Observable<User[]>;
	public filteredAuditor: Observable<User[]>;
	
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
		Object.assign(queue, this.getFormValue());
		const queueModel:any = {
			normativeId: queue.normative.id || '',
			contactId: queue.contact.id || '',
			statusId: queue.statusId || '',
			organizationId: queue.organization.id || '',
			endDate: moment(queue.endDate).format('MM-DD-YYYY') || '',
			startDate: moment(queue.startDate).format('MM-DD-YYYY') || '',
			isCertified: false
		}

		if(this.isEditing) {
			this.store.dispatch(actions.editQueue({ payload: queueModel, id: this.queue.id }));
		} else if(this.isCreating) {
			this.store.dispatch(actions.createQueue({ payload: queueModel }));
		}
		this.data && this.data.callback ? this.data.callback() : void 0;
		this.dialogRef.close();
	}

	private buildQueueForm(): void {
		const form: any = {
			statusId: ['', [Validators.required]],
			contact: ['', [Validators.required]],
			normative: ['', [Validators.required]],
			organization: ['', [Validators.required]],
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
		if(this.formGroup && this.formGroup.controls) {
			this.filteredNormatives = this.formGroup.controls['normative'].valueChanges.pipe(
				startWith(''),
				map(value => typeof value === 'string' ? value : `${value.category}${value.order}-${value.publishetAt}`),
				map(value => this.filterByNortic(value))
			);

			this.filteredOrganizations = this.formGroup.controls['organization'].valueChanges.pipe(
				startWith(''),
				map(value => typeof value === 'string' ? value : value.name),
				map(value => this.filterByOrganization(value))
			);

			this.filteredContacts = this.formGroup.controls['contact'].valueChanges.pipe(
				startWith(''),
				map(value => typeof value === 'string' ? value : value.name),
				map(value => this.filterByContact(value))
			);

		}
	}

	public mapContactIntoAutoComplete(value: Contact): string {
		return value && value.name ? value.name : '';
	}

	public mapOrganizationIntoAutoComplete(value: Organization): string {
		return value && value.name ? `${value.name} (${value.acronym})` : '';
	}

	public mapNorticIntoAutoComplete(value: Normative): string {
		return value && value.id ? `${value.category}${value.order}-${value.publishetAt}` : '';
	}

	private filterByNortic(value: string): Normative[] {
		const filterValue = value.toLowerCase();	
		return this.normatives.filter(option => option.description.toLowerCase().includes(filterValue) || option.publishetAt.toString().toLowerCase().includes(filterValue));
	}

	private filterByOrganization(value: string): Organization[] {
		const filterValue = value.toLowerCase();	
		return this.organizations.filter(option => 
			option.name.toLowerCase().includes(filterValue) || 
			option.acronym.toString().toLowerCase().includes(filterValue) ||
			option.city.toString().toLowerCase().includes(filterValue)
		);
	}

	private filterByContact(value: string): Organization[] {
		const filterValue = value.toLowerCase();	
		return this.contacts.filter(option => 
			option.name.toLowerCase().includes(filterValue) || 
			option.email.toString().toLowerCase().includes(filterValue) ||
			option.ext.toString().toLowerCase().includes(filterValue) ||
			option.telephoneNumber.toString().toLowerCase().includes(filterValue) ||
			option.phoneNumber.toString().toLowerCase().includes(filterValue) ||
			option.id.toString().toLowerCase().includes(filterValue) ||
			option.position.toString().toLowerCase().includes(filterValue) 
		);
	}

}
