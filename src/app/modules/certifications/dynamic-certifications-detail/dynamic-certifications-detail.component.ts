import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Certification } from 'src/app/core/domain/certifications/certifications.models';
import { CommonGridAbstractDetails } from 'src/app/core/models/common-details.abstract';
import { Certificationstate } from 'src/app/core/stores/certifications/certifications.reducers';
import * as actions from 'src/app/core/stores/certifications/certifications.actions';
import { GLOBAL_STATUS, GenericTypeValue } from 'src/app/core/models/enat.models';

@Component({
  selector: 'app-dynamic-certifications-detail',
  templateUrl: './dynamic-certifications-detail.component.html',
  styleUrls: ['./dynamic-certifications-detail.component.scss']
})
export class DynamicCertificationsDetailComponent extends CommonGridAbstractDetails<Certification> implements OnInit {

  public certification: Certification = null;
  public certificationStatuses: GenericTypeValue[] = GLOBAL_STATUS;
  
  constructor(
      private store: Store<{certifications: Certificationstate}>,
      public formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialogRef: MatDialogRef<DynamicCertificationsDetailComponent>
    ) {
      super(formBuilder);
  }

  ngOnInit(): void {
      this.loadComponent();
      this.buildCertificationForm();
  }

  public loadComponent(): void {
      this.certification = this.data ? { ...this.data['certification'] } : null;
      this.isEditing = this.data ? this.data['isEditing'] : false;
      this.isCreating = this.data ? this.data['isCreating'] : false;
  }

  public onSaveChanges(): void {
      if(this.isEditing) {
          this.store.dispatch(actions.editCertifications({ payload: this.getFormValue(), id: this.certification.id }));
      } else if(this.isCreating) {
          this.store.dispatch(actions.createCertifications({ payload: this.getFormValue() }));
      }
      this.store.dispatch(actions.onSuccess());
      this.dialogRef.close();
  }

  private buildCertificationForm(): void {
      const form: any = {
          organization: ['', Validators.required],
          nortic: ['', Validators.required],
          niu: ['', [Validators.required]],
          type: ['', [Validators.required]],
          statusId: ['', [Validators.required]],
      }
      this.certification ? super.buildForm(form, this.certification) : super.buildForm(form);
  }
}
