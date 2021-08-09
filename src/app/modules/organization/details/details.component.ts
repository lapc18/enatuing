import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { CertificationModel } from 'src/app/core/domain/certifications/certifications.models';
import { Organization } from 'src/app/core/domain/organizations/organizations.models';
import { QueueUserAction } from 'src/app/core/domain/queue-user/queue-user.model';
import { Queue, QueueModel } from 'src/app/core/domain/queue/queue.models';
import { NorticStamp } from 'src/app/core/models/enat.models';
import { NorticStampComponent } from 'src/app/shared/components/nortic-stamp/nortic-stamp.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  	
	@ViewChild('nortic') stamp: NorticStampComponent;
	public norticsDone:NorticStamp[] = [];
	public norticsInProgress:NorticStamp[] = [];
	public organization:Organization = null;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<DetailsComponent>
	) { 
	}

	ngOnInit(): void {
		this.loadComponent();
	}
	
	public loadComponent(): void {
		console.log(this.data)
		this.organization = this.data && this.data.item ? this.data.item : null;
		const certifications:CertificationModel[] = this.data && this.data.certifications ? this.data.certifications : [];
		const queue:QueueModel[] = this.data && this.data.queue ? this.data.queue : [];
		if(certifications) {
			certifications.forEach((x) => {
				this.norticsDone.push({
					niu: x.niu,
					color: x.normative.color,
					nortic: `${x.normative.category}${x.normative.order}`,
					year: x.normative.publishetAt,
					startDate: moment(x.startDate).format('DD/MM/YYYY'),
					endDate: moment(x.endDate).format('DD/MM/YYYY')
				});
			});
		}
		
		if(queue) {
			queue.forEach((x) => {

				let audit:QueueUserAction = {};
				let consult:QueueUserAction = {};

				if(x.queueActions && x.queueActions.length > 0) {
					audit = x.queueActions.find(x => x.queueAction.name.toLowerCase().includes('audit'));
					consult = x.queueActions.find(x => x.queueAction.name.toLowerCase().includes('consult'));
				}

				this.norticsInProgress.push({
					niu: `00000-00-${x.normative.category}${x.normative.order}${x.normative.publishetAt}001`,
					color: x.normative.color,
					nortic: `${x.normative.category}${x.normative.order}`,
					year: x.normative.publishetAt,
					auditor: audit && audit.user ? `${audit.user.name} ${audit.user.lastName}` : '',
					consultant: consult && consult.user ? `${consult.user.name} ${consult.user.lastName}` : '',
					startDate: moment(x.startDate).format('DD/MM/YYYY'),
					endDate: moment(x.endDate).format('DD/MM/YYYY')
				});
			});
		}
		
	}

}
