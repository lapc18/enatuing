import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { CertificationModel } from 'src/app/core/domain/certifications/certifications.models';
import { Organization } from 'src/app/core/domain/organizations/organizations.models';
import { NorticStamp } from 'src/app/core/models/enat.models';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  	
	public nortics:NorticStamp[] = [];
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
		if(certifications) {
			certifications.forEach((x) => {
				this.nortics.push({
					niu: x.niu,
					color: x.normative.color,
					nortic: `${x.normative.category}${x.normative.order}`,
					year: x.normative.publishetAt,
					startDate: moment(x.startDate).format('DD/MM/YYYY'),
					endDate: moment(x.endDate).format('DD/MM/YYYY')
				});
				this.nortics.push({
					niu: x.niu,
					color: x.normative.color,
					nortic: `${x.normative.category}${x.normative.order}`,
					year: x.normative.publishetAt,
					startDate: moment(x.startDate).format('DD/MM/YYYY'),
					endDate: moment(x.endDate).format('DD/MM/YYYY')
				});
				this.nortics.push({
					niu: x.niu,
					color: x.normative.color,
					nortic: `${x.normative.category}${x.normative.order}`,
					year: x.normative.publishetAt,
					startDate: moment(x.startDate).format('DD/MM/YYYY'),
					endDate: moment(x.endDate).format('DD/MM/YYYY')
				});
				this.nortics.push({
					niu: x.niu,
					color: x.normative.color,
					nortic: `${x.normative.category}${x.normative.order}`,
					year: x.normative.publishetAt,
					startDate: moment(x.startDate).format('DD/MM/YYYY'),
					endDate: moment(x.endDate).format('DD/MM/YYYY')
				});
				this.nortics.push({
					niu: x.niu,
					color: x.normative.color,
					nortic: `${x.normative.category}${x.normative.order}`,
					year: x.normative.publishetAt,
					startDate: moment(x.startDate).format('DD/MM/YYYY'),
					endDate: moment(x.endDate).format('DD/MM/YYYY')
				});
				this.nortics.push({
					niu: x.niu,
					color: x.normative.color,
					nortic: `${x.normative.category}${x.normative.order}`,
					year: x.normative.publishetAt,
					startDate: moment(x.startDate).format('DD/MM/YYYY'),
					endDate: moment(x.endDate).format('DD/MM/YYYY')
				});
				this.nortics.push({
					niu: x.niu,
					color: x.normative.color,
					nortic: `${x.normative.category}${x.normative.order}`,
					year: x.normative.publishetAt,
					startDate: moment(x.startDate).format('DD/MM/YYYY'),
					endDate: moment(x.endDate).format('DD/MM/YYYY')
				});
				this.nortics.push({
					niu: x.niu,
					color: x.normative.color,
					nortic: `${x.normative.category}${x.normative.order}`,
					year: x.normative.publishetAt,
					startDate: moment(x.startDate).format('DD/MM/YYYY'),
					endDate: moment(x.endDate).format('DD/MM/YYYY')
				});
				this.nortics.push({
					niu: x.niu,
					color: x.normative.color,
					nortic: `${x.normative.category}${x.normative.order}`,
					year: x.normative.publishetAt,
					startDate: moment(x.startDate).format('DD/MM/YYYY'),
					endDate: moment(x.endDate).format('DD/MM/YYYY')
				});
				this.nortics.push({
					niu: x.niu,
					color: x.normative.color,
					nortic: `${x.normative.category}${x.normative.order}`,
					year: x.normative.publishetAt,
					startDate: moment(x.startDate).format('DD/MM/YYYY'),
					endDate: moment(x.endDate).format('DD/MM/YYYY')
				});
			});
		}
	}

}
