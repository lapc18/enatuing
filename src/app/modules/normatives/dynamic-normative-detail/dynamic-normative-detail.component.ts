import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Normative } from 'src/app/core/domain/normatives/normatives.models';
import { CommonGridAbstractDetails } from 'src/app/core/models/common-details.abstract';
import { GenericTypeValue, GLOBAL_NORTIC_CATEGORIES } from 'src/app/core/models/enat.models';
import * as actions from 'src/app/core/stores/normatives/normatives.actions';
import { NormativesState } from 'src/app/core/stores/normatives/normatives.reducers';

@Component({
  selector: 'app-dynamic-normative-detail',
  templateUrl: './dynamic-normative-detail.component.html',
  styleUrls: ['./dynamic-normative-detail.component.scss']
})
export class DynamicNormativeDetailComponent extends CommonGridAbstractDetails<Normative> implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public normative: Normative = null;
  public normativeStatuses: GenericTypeValue[] = [];
  public isLoadingnormativeStatuses: boolean = false;
  public categories:GenericTypeValue[] = GLOBAL_NORTIC_CATEGORIES;
  
  constructor(
      private store: Store<{normatives: NormativesState}>,
      public formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialogRef: MatDialogRef<DynamicNormativeDetailComponent>
    ) {
      super(formBuilder);
  }

  ngOnInit(): void {
    this.loadComponent();
    this.buildNormativeForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public loadComponent(): void {
    this.subscriptions.push(
      this.store.pipe(select(item => item.normatives.normativeStatuses)).subscribe(res => this.normativeStatuses = res)
    );
    this.subscriptions.push(
      this.store.pipe(select(item => item.normatives.isLoadingNormativeStatuses)).subscribe(res => this.isLoadingnormativeStatuses = res)
    );
    this.store.dispatch(actions.loadNormativeStatuses());
    this.normative = this.data ? { ...this.data['normative'] } : null;
    this.isEditing = this.data ? this.data['isEditing'] : false;
    this.isCreating = this.data ? this.data['isCreating'] : false;
  }

  public onSaveChanges(): void {
    if(this.isEditing) {
        this.store.dispatch(actions.editNormatives({ payload: this.getFormValue(), id: this.normative.id }));
    } else if(this.isCreating) {
        this.store.dispatch(actions.createNormatives({ payload: this.getFormValue() }));
    }
    this.store.dispatch(actions.onSuccess());
    this.data.callback ? this.data.callback() : void 0;
    this.dialogRef.close();
  }

  private buildNormativeForm(): void {
    const form: any = {
      statusId: ['', Validators.required],
      publishetAt: [0, [Validators.required, Validators.minLength(4)]],
      color: ['#000000', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      order: [1, [Validators.required]],
    }
    this.normative ? super.buildForm(form, this.normative) : super.buildForm(form);
  }
}