import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Certification, CertificationModel } from 'src/app/core/domain/certifications/certifications.models';
import { QueueUserAction } from 'src/app/core/domain/queue-user/queue-user.model';
import { Queue, QueueModel } from 'src/app/core/domain/queue/queue.models';
import { DialogFactory } from 'src/app/core/factory/dialogs/dialog.factory';
import { CommonAbstractGrid } from 'src/app/core/models/common-grid.abstract';
import { columnSettings, FileType } from 'src/app/core/models/enat.models';
import { ExportService } from 'src/app/core/services/export.service';
import { Certificationstate } from 'src/app/core/stores/certifications/certifications.reducers';
import * as actions from 'src/app/core/stores/queue/queue.actions';
import * as certActions from 'src/app/core/stores/certifications/certifications.actions';
import * as norticsActions from 'src/app/core/stores/normatives/normatives.actions';
import { QueueState } from 'src/app/core/stores/queue/queue.reducers';
import { AssignmentComponent } from './assignment/assignment.component';
import { DynamicQueueDetailComponent } from './dynamic-queue-detail/dynamic-queue-detail.component';
import * as moment from 'moment';
import { NormativesState } from 'src/app/core/stores/normatives/normatives.reducers';
import { Normative } from 'src/app/core/domain/normatives/normatives.models';
import { generateNIU } from 'src/app/core/utils/enat.utils';
import { ActivatedRoute, Router } from '@angular/router';
import { NorticCodeViewerComponent } from 'src/app/shared/components/nortic-code-viewer/nortic-code-viewer.component';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent extends CommonAbstractGrid<QueueModel, Queue> implements OnInit {

	public allowedRoles: { assignment?: string[], create?: string[], edit?: string[], remove?: string[], certify:string[] } = {
		assignment: ['admin', 'manager', 'audit', 'supervisor'],
		create: ['admin', 'manager', 'audit', 'supervisor'],
		edit: ['admin', 'manager', 'audit', 'supervisor'],
		remove: ['admin', 'manager'],
		certify: ['admin', 'manager', 'supervisor', 'audit'],
	};
	public dataMapped: Queue[] = [];
	public certifications: CertificationModel[] = [];
	public normatives: Normative[] = [];
	public certificationCreated: CertificationModel;


	constructor(
		private route: ActivatedRoute,
		private dialog: MatDialog,
		private store: Store<{
			queue: QueueState,
			certifications: Certificationstate,
			normatives: NormativesState
		}>,
		public dialogFactory: DialogFactory,
		public exportService: ExportService
	) {
		super(columnSettings.queue);
		this.data$ = this.store.pipe(select(state => state.queue.queue));
		this.isLoading$ = this.store.pipe(select(state => state.queue.isLoading));
	}

	ngOnInit(): void {
		this.route.url.subscribe(segments => {
			this.store.dispatch(actions.loadQueue());
			segments.forEach(x => {
				if(x.path.includes('current')) {
					const routeParams = this.route.snapshot.paramMap;
					const type = String(routeParams.get('type'));
					this.loadDataByType(type);
				} else if(x.path.includes('user')) {
					const routeParams = this.route.snapshot.paramMap;
					const userId = String(routeParams.get('userId'));
					this.loadDataByUser(userId);
				}
			});
		});
		this.subscriptions.push(this.store.pipe(select(x => x.certifications.lastCertificationCreated)).subscribe((res) => res && res.id ? this.onCertificationCreated(res):void 0));
	}

	private mapToTable(queue: QueueModel[]): void {
		this.dataMapped = queue.map(item => {
			let itemMapped:Queue = {};

			//{{item.category}}{{item.order}}-{{item.publishetAt}}
			itemMapped.nortic = `${item.normative.category || ''}${item.normative.order || ''}-${item.normative.publishetAt || ''}`;
			itemMapped.organization = `${item.organization.name || ''}-(${item.organization.acronym || ''})`;
			itemMapped.status = `${item.status && item.status.description? item.status.description : ''}`;
			itemMapped.contact = `${item.contact && item.contact.name ? item.contact.name : ''}`;
			itemMapped.id = item.id || '';
			itemMapped.type = item.type || '';
			itemMapped.startDate = moment(item.startDate).format('DD-MM-YYYY') || '';
			itemMapped.endDate = moment(item.endDate).format('DD-MM-YYYY')  || '';

			if(item.queueActions && item.queueActions.length > 0) {
				const audit:QueueUserAction = item.queueActions.find(x => x.queueAction.name.toLowerCase().includes('audit'));
				const consult:QueueUserAction = item.queueActions.find(x => x.queueAction.name.toLowerCase().includes('consult'));
				itemMapped.auditor = audit && audit.user ? `${audit.user.name} ${audit.user.lastName}` : '';
				itemMapped.consultant = consult && consult.user ? `${consult.user.name} ${consult.user.lastName}` : '';
				itemMapped.consultantId = consult && consult.user ? consult.user.id : '';
				itemMapped.auditorId = audit && audit.user ? audit.user.id: '';
			}
			return itemMapped;
		});
	}

	public loadDataByUser(userId?:string): void {
		this.subscriptions.push(
			this.isLoading$.subscribe(res => this.isLoading = res),
			this.data$.subscribe((res: QueueModel[]) => {
				this.data = res;
				this.mapToTable(res);
				this.dataMapped = this.dataMapped.filter(x => 
					(x.auditorId && x.auditorId.includes(userId)) ||
					(x.consultantId && x.consultantId.includes(userId))
				);
			}),
			this.store.pipe(select(store => store.certifications.certifications)).subscribe(res => this.certifications = res)
		);
	}

	public loadDataByType(type?:string): void {
		let isCertified:boolean = type.includes('inprocess') ? false : true;
		this.subscriptions.push(
			this.isLoading$.subscribe(res => this.isLoading = res),
			this.data$.subscribe((res: QueueModel[]) => {
				this.data = res;
				this.mapToTable(res);
				if(!type.includes('null')) {
					this.dataMapped = this.dataMapped.filter(x => x.isCertified && x.isCertified == isCertified);
				} 
			}),
			this.store.pipe(select(store => store.certifications.certifications)).subscribe(res => this.certifications = res)
		);
	}

	public onCreate(): void {
		this.dialog.open(DynamicQueueDetailComponent, {
			data: { 
				isCreating: true, 
				callback:() => {
					setTimeout(() => this.store.dispatch(actions.loadQueue()));
				} 
			},
			minWidth: '50%',
			minHeight: '60vh',
			hasBackdrop: true,
			disableClose: true,
		});
	}

	public onEdit(item: QueueModel | Queue): void {
		let queueItem:QueueModel = {...this.data.find(x => x.id == item.id)};
		this.dialog.open(DynamicQueueDetailComponent, {
			data: {
				isEditing: true,
				item: queueItem
			},
			minWidth: '50%',
			minHeight: '60vh',
			hasBackdrop: true,
			disableClose: true,
		});
	}

	public onDelete(item: QueueModel | Queue): void {
		this.dialogFactory.confirmation({
			message: '??Est?? seguro que desea eliminar esta solicitud de certificaci??n?',
			callback:() => {
				this.store.dispatch(actions.removeQueue({ id: item.id}));
			}
		});

	}

	public onSeeDetails(item: QueueModel | Queue): void {
		this.dialog.open(DynamicQueueDetailComponent, {
			data: {
				isEditing: false,
				item: item
			},
			minWidth: '50%',
			minHeight: '60vh',
			hasBackdrop: true
		});
	}

	public onExport(fileType: FileType): void {
		const fileName: string = `queue-export-${Date.now()}`;
		this.exportService.saveToFile(fileType, this.selectedData.selected, fileName);
	}

	public showAssignmentDialog(): void {
		this.dialogFactory.create(AssignmentComponent, {
			data: {
				isFullAssignmentMode: true
			},
			width: '60vw',
			height: '80vh',
			hasBackdrop: true,
		});
	}

	public showAssignmentConsultanDialog(item: QueueModel | Queue): void {
		let queueItem:QueueModel = {...this.data.find(x => x.id == item.id)};
		this.dialogFactory.create(AssignmentComponent, {
			data: {
				isConsultantAssignmentMode: true,
				item: queueItem
			},
			width: '60vw',
			height: '80vh',
			hasBackdrop: true,
		});
	}

	public showAssignmentAuditorDialog(item: QueueModel | Queue): void {
		let queueItem:QueueModel = {...this.data.find(x => x.id == item.id)};
		this.dialogFactory.create(AssignmentComponent, {
			data: {
				isAuditorAssignmentMode: true,
				item: queueItem
			},
			width: '60vw',
			height: '80vh',
			hasBackdrop: true,
		});
	}

	public certifyRequest(item: QueueModel | Queue): void {
		let queueItem:QueueModel = {...this.data.find(x => x.id == item.id)};
		let canCertify:boolean = true;
		Object.keys(queueItem).forEach((key) => {
			if((queueItem[key] as Object).hasOwnProperty('id') && canCertify) {
				if(
					!queueItem[key].id || 
					queueItem[key].id == '' || 
					!(item as Queue).auditor || 
					!(item as Queue).consultant || 
					(item as Queue).auditor == '' || 
					(item as Queue).consultant == ''
				) {
					canCertify = false;
				}
			}
		});
		canCertify ? 
		this.dialogFactory.confirmation({
			hasBackdrop: true,
			message: '??Est?? seguro que desea certificar esta solicitud de certificaci??n?',
			callback:() => {
				this.saveCertification({...queueItem});
				this.updateRequestStatus({...queueItem});
				this.store.dispatch(certActions.loadCertifications());
				this.store.dispatch(actions.loadQueue());
			}
		}) : 
		this.dialogFactory.warning({
			hasBackdrop: true,
			message: 'Esta solicitud no puede ser certificada, favor de completar los requerimientos restantes.'
		});
	}


	private saveCertification(item: QueueModel): void {

		const niu: string = generateNIU(item, this.certifications, this.normatives);
		const startDate: string = moment().format('MM-DD-YYYY');
		const endtDate: string = moment().add(2, 'years').format('MM-DD-YYYY');
		const nortic: string = `${item.normative.category}${item.normative.order}${item.normative.publishetAt}`;

		let payload:CertificationModel = {
			normativeId: item.normative.id,
			organizationId: item.organization.id,
			niu: niu,
			startDate: startDate,
			endDate: endtDate,
			nortic: nortic,
			normative: item.normative,
			organization: item.organization,
			status: '0',
			type: item.type
		};

		this.store.dispatch(certActions.createCertifications({payload: payload}));
	}

	private updateRequestStatus(item: QueueModel): void {
		item.isCertified = true;
		this.store.dispatch(actions.editQueue({ payload: item, id: item.id}))
	}

	private onCertificationCreated(item: CertificationModel): void {
		console.log('from here')
		this.dialogFactory.create(NorticCodeViewerComponent, {
			data: {
				certification: item
			},
			width: '70vw',
			height: '80vh'
		});
	}
  
}