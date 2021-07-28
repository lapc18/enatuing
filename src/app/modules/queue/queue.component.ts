import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { QueueUserAction } from 'src/app/core/domain/queue-user/queue-user.model';
import { Queue, QueueModel } from 'src/app/core/domain/queue/queue.models';
import { DialogFactory } from 'src/app/core/factory/dialogs/dialog.factory';
import { CommonAbstractGrid } from 'src/app/core/models/common-grid.abstract';
import { columnSettings, FileType } from 'src/app/core/models/enat.models';
import { ExportService } from 'src/app/core/services/export.service';
import * as actions from 'src/app/core/stores/queue/queue.actions';
import { QueueState } from 'src/app/core/stores/queue/queue.reducers';
import { AssignmentComponent } from './assignment/assignment.component';
import { DynamicQueueDetailComponent } from './dynamic-queue-detail/dynamic-queue-detail.component';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent extends CommonAbstractGrid<QueueModel, Queue> implements OnInit {

	public dataMapped: Queue[] = [];

	constructor(
		private dialog: MatDialog,
		private store: Store<{queue: QueueState}>,
		public dialogFactory: DialogFactory,
		public exportService: ExportService
	) {
		super(columnSettings.queue);
		this.data$ = this.store.pipe(select(state => state.queue.queue));
		this.isLoading$ = this.store.pipe(select(state => state.queue.isLoading));
	}

	ngOnInit(): void {
		this.loadData();
	}

	public loadData(): void {
		this.store.dispatch(actions.loadQueue());
		this.isLoading$.subscribe(res => this.isLoading = res);
		this.data$.subscribe((res: QueueModel[]) => {
			this.data = res;
			this.dataMapped = res.map(item => {
				let itemMapped:Queue = {};

				if(item) {
					//{{item.category}}{{item.order}}-{{item.publishetAt}}
					itemMapped.nortic = `${item.normative.category || ''}${item.normative.order || ''}-${item.normative.publishetAt || ''}`;
					itemMapped.organization = `${item.organization.name || ''}-(${item.organization.acronym || ''})`;
					itemMapped.status = `${item.status && item.status.description? item.status.description : ''}`;
					itemMapped.contact = `${item.contact && item.contact.name ? item.contact.name : ''}`;
					itemMapped.id = item.id || '';
					itemMapped.type = item.type || '';
					itemMapped.startDate = item.startDate || '';
					itemMapped.endDate = item.endDate || '';

					if(item.queueActions && item.queueActions.length > 0) {
						const audit:QueueUserAction = item.queueActions.find(x => x.queueAction.name.toLowerCase().includes('audit'));
						const consult:QueueUserAction = item.queueActions.find(x => x.queueAction.name.toLowerCase().includes('consult'));
						itemMapped.auditor = audit && audit.user ? `${audit.user.name} ${audit.user.lastName}` : '';
						itemMapped.consultant = consult && consult.user ? `${consult.user.name} ${consult.user.lastName}` : '';
					}

				}
				return itemMapped;
			});
		});
	}

	public onCreate(): void {
		this.dialog.open(DynamicQueueDetailComponent, {
			data: { 
				isCreating: true, 
				callback:() => {
					this.store.dispatch(actions.loadQueue());
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
			message: '¿Está seguro que desea eliminar esta solicitud de certificación?',
			callback:() => {
				this.store.dispatch(actions.removeQueue({ id: item.id}));
				this.store.dispatch(actions.onSuccess());
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
		const fileName: string = `some-name-here-${Date.now()}`;
		this.exportService.saveToFile(fileType, this.data, fileName);
	}

	public showAssignmentDialog(): void {
		this.dialogFactory.create(AssignmentComponent, {
			data: {},
			width: 50,
			height: 60,
			hasBackdrop: true,
		});
	}

  
}