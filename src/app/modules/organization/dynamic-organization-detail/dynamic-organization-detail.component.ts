import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Organization } from 'src/app/core/domain/organizations/organizations.models';
import { CommonGridAbstractDetails } from 'src/app/core/models/common-details.abstract';
import { OrganizationState } from 'src/app/core/stores/organizations/organizations.reducers';
import * as actions from 'src/app/core/stores/organizations/organizations.actions';
import { City } from 'src/app/core/models/enat.models';

@Component({
  selector: 'app-dynamic-organization-detail',
  templateUrl: './dynamic-organization-detail.component.html',
  styleUrls: ['./dynamic-organization-detail.component.scss']
})
export class DynamicOrganizationDetailComponent extends CommonGridAbstractDetails<Organization> implements OnInit {

    public organization: Organization = null;
    public cities: City[] = [];
    
    constructor(
      private store: Store<{organization: OrganizationState}>,
      public formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialogRef: MatDialogRef<DynamicOrganizationDetailComponent>
    ) {
      super(formBuilder);
    }

    ngOnInit(): void {
      this.loadCities();
      this.loadComponent();
      this.buildOrganizationForm();
    }

    private loadCities(): void {
      this.store.pipe(select(x => x.organization.cities)).subscribe(res => this.cities = res);
      this.store.dispatch(actions.loadCities())
    }

    public loadComponent(): void {
      this.organization = this.data ? { ...this.data['organization'] } : null;
      this.isEditing = this.data ? this.data['isEditing'] : false;
      this.isCreating = this.data ? this.data['isCreating'] : false;
    }

    public onSaveChanges(): void {
      if(this.isEditing) {
        this.store.dispatch(actions.editOrganizations({ payload: this.getFormValue(), id: this.organization.id }));
      } else if(this.isCreating) {
        this.store.dispatch(actions.createOrganizations({ payload: this.getFormValue() }));
      }
      this.data && this.data.callback ? this.data.callback() : void 0;
      this.dialogRef.close();
    }

    private buildOrganizationForm(): void {
      const form: any = {
        name: ['', Validators.required],
        acronym: ['', Validators.required],
        city: ['', [Validators.required]],
      }
      this.organization ? super.buildForm(form, this.organization) : super.buildForm(form);
    }

	public setAcronymOnValueChange(): void {
		const name = this.formGroup.get('name');
		let arr:string[] = (name.value as string).split(' ');
		let acronym:string[] = [];
		arr.forEach(e => acronym.push(e.split('')[0]));
		this.setPropValue('acronym', acronym.join('').toUpperCase());
	}

}