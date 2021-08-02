import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Certification, CertificationModel } from 'src/app/core/domain/certifications/certifications.models';
import { Normative } from 'src/app/core/domain/normatives/normatives.models';
import { NorticStamp } from 'src/app/core/models/enat.models';
import { NormativesState } from 'src/app/core/stores/normatives/normatives.reducers';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

	public nortic:NorticStamp = null;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<DetailsComponent>
	) { 
	}

	ngOnInit(): void {
		this.loadComponent();
	}
	public loadComponent(): void {
		const certification:CertificationModel = this.data && this.data.item ? this.data.item : null;
		console.log('cert', certification);
		if(certification) {
			this.nortic = {
				niu: certification.niu,
				color: certification.normative.color,
				nortic: `${certification.normative.category}${certification.normative.order}`,
				year: certification.normative.publishetAt
			}
		}
	}

}
