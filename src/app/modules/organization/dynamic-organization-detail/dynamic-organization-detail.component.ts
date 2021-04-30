import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Organization } from 'src/app/core/domain/organizations/organizations.models';
import { CommonGridAbstractDetails } from 'src/app/core/models/common-details.abstract';
import { OrganizationState } from 'src/app/core/stores/organizations/organizations.reducers';
import * as actions from 'src/app/core/stores/organizations/organizations.actions';

@Component({
  selector: 'app-dynamic-organization-detail',
  templateUrl: './dynamic-organization-detail.component.html',
  styleUrls: ['./dynamic-organization-detail.component.scss']
})
export class DynamicOrganizationDetailComponent extends CommonGridAbstractDetails<Organization> implements OnInit {

  public organization: Organization = null;
  
  constructor(
      private store: Store<{organization: OrganizationState}>,
      public formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialogRef: MatDialogRef<DynamicOrganizationDetailComponent>
    ) {
      super(formBuilder);
  }

  ngOnInit(): void {
      this.loadComponent();
      this.buildOrganizationForm();
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
      this.store.dispatch(actions.onSuccess());
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
}