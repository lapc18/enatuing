import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { CertificationModel } from 'src/app/core/domain/certifications/certifications.models';
import { Organization } from 'src/app/core/domain/organizations/organizations.models';
import { NorticStamp } from 'src/app/core/models/enat.models';
import { convertBlobToBase64, downloadAsTxt } from 'src/app/core/utils/enat.utils';

@Component({
  selector: 'nortic-code-viewer',
  templateUrl: './nortic-code-viewer.component.html',
  styleUrls: ['./nortic-code-viewer.component.scss']
})
export class NorticCodeViewerComponent implements OnInit {

	public certification:CertificationModel = null;
	public organization:Organization = null;
	public nortic:NorticStamp;
	public code: string = '';
	public isLoading:boolean = true;

	constructor(
		private dialogRef: MatDialogRef<NorticCodeViewerComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) { 

	}

	ngOnInit(): void {
		this.loadComponent();
	}

	public loadComponent(): void {
		this.certification = this.data.data && this.data.data.certification ? this.data.data.certification : null;
		if(this.certification) {
			this.organization = this.certification.organization;
			this.nortic = {
				niu: this.certification.niu,
				color: this.certification.normative.color,
				nortic: `${this.certification.normative.category}${this.certification.normative.order}`,
				year: this.certification.normative.publishetAt,
				startDate: moment(this.certification.startDate).format('DD/MM/YYYY'),
				endDate: moment(this.certification.endDate).format('DD/MM/YYYY')
			};
		}
	}

	public generateCode(options: any): any {
		this.isLoading = true;
		convertBlobToBase64(options.active).then(a64 => {
			convertBlobToBase64(options.inactive).then(i64 => {
				this.isLoading = false;
				this.code = code(this.nortic.endDate, a64, i64);
			});
		});
	}

	public saveAsFile(): void {
		downloadAsTxt(this.organization.acronym, this.code);
	}

}

const code = (endDate: string, active, inactive):string  => {
	return `
	<script>
		//you are not authorized to modify this script, if ENAT audits your websites will validate the certification to avoid hardcoded NORTIC's!
		const now = new Date(Date.now());
		const endDate = new Date('${endDate}');
		var base64Src = 
			(now >= endDate) ? 
				'${active}' : 
				'${inactive}';

		// here you must select your image tag to set the soure as well //
		var image = document.querySelector('#your-image'); // <img id="your-image">
		image.src = base64Src;
	</script>
`
};