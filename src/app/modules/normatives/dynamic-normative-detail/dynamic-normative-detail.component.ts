import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Normative, NORMATIVE_STATUSES } from 'src/app/core/domain/normatives/normatives.models';
import { CommonGridAbstractDetails } from 'src/app/core/models/common-details.abstract';
import { GenericTypeValue } from 'src/app/core/models/enat.models';
import * as actions from 'src/app/core/stores/normatives/normatives.actions';

@Component({
  selector: 'app-dynamic-normative-detail',
  templateUrl: './dynamic-normative-detail.component.html',
  styleUrls: ['./dynamic-normative-detail.component.scss']
})
export class DynamicNormativeDetailComponent extends CommonGridAbstractDetails<Normative> implements OnInit {

  public organization: Normative = null;
  public organizationStatuses: GenericTypeValue[] = NORMATIVE_STATUSES;
  
  constructor(
      private store: Store<{organization: {}}>,
      public formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialogRef: MatDialogRef<DynamicNormativeDetailComponent>
    ) {
      super(formBuilder);
  }

  ngOnInit(): void {
    this.loadComponent();
    this.buildNormativeForm();
    console.log(this.formGroup)
  }

  public loadComponent(): void {
    this.organization = this.data ? { ...this.data['organization'] } : null;
    this.isEditing = this.data ? this.data['isEditing'] : false;
    this.isCreating = this.data ? this.data['isCreating'] : false;
  }

  public onSaveChanges(): void {
    if(this.isEditing) {
        this.store.dispatch(actions.editNormatives({ payload: this.getFormValue(), id: this.organization.id }));
    } else if(this.isCreating) {
        this.store.dispatch(actions.createNormatives({ payload: this.getFormValue() }));
    }
    this.store.dispatch(actions.onSuccess());
    this.dialogRef.close();
  }

  private buildNormativeForm(): void {
    const form: any = {
      status: ['', Validators.required],
      publishedAt: ['', Validators.required],
      color: ['', [Validators.required]],
      description: ['', [Validators.required]],
    }
    this.organization ? super.buildForm(form, this.organization) : super.buildForm(form);
  }
}