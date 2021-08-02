import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Normative } from 'src/app/core/domain/normatives/normatives.models';
import { Organization } from 'src/app/core/domain/organizations/organizations.models';
import { DialogFactory } from 'src/app/core/factory/dialogs/dialog.factory';
import { CommonAbstractGrid } from 'src/app/core/models/common-grid.abstract';
import { columnSettings, FileType } from 'src/app/core/models/enat.models';
import { ExportService } from 'src/app/core/services/export.service';
import { Certificationstate } from 'src/app/core/stores/certifications/certifications.reducers';
import * as actions from 'src/app/core/stores/organizations/organizations.actions';
import * as certActions from 'src/app/core/stores/certifications/certifications.actions';
import { OrganizationState } from 'src/app/core/stores/organizations/organizations.reducers';
import { DetailsComponent } from './details/details.component';
import { DynamicOrganizationDetailComponent } from './dynamic-organization-detail/dynamic-organization-detail.component';
import { CertificationModel } from 'src/app/core/domain/certifications/certifications.models';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent extends CommonAbstractGrid<Organization> implements OnInit, OnDestroy {

  public allowedRoles: { create?: string[], edit?: string[], remove?: string[] } = {
		create: ['admin', 'manager', 'audit', 'supervisor', 'consultant'],
		edit: ['admin', 'manager', 'audit', 'supervisor', 'consultant'],
		remove: ['admin', 'manager']
	};

  constructor(
    private dialog: MatDialog,
    private store: Store<{ organization: OrganizationState, certifications:Certificationstate }>,
    public dialogFactory: DialogFactory,
    public exportService: ExportService
  ) {
    super(columnSettings.organizations);
    this.data$ = this.store.pipe(select(state => state.organization.organizations));
    this.isLoading$ = this.store.pipe(select(state => state.organization.isLoading));
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public loadData(): void {
    this.store.dispatch(actions.loadOrganizations());
    this.store.dispatch(certActions.loadCertifications());
    this.subscriptions.push(this.isLoading$.subscribe(res => this.isLoading = res));
    this.subscriptions.push(this.data$.subscribe((res: Organization[]) => this.data = res));
  }

  public onCreate(): void {
    this.dialog.open(DynamicOrganizationDetailComponent, {
      data: { isCreating: true },
      minWidth: '50%',
      minHeight: '60vh',
      hasBackdrop: true,
      disableClose: true,
    });
  }

  public onEdit(item: Organization): void {
    this.dialog.open(DynamicOrganizationDetailComponent, {
      data: {
        isEditing: true,
        organization: item,
        callback:() => {
          this.loadData();
        }
      },
      minWidth: '50%',
      minHeight: '60vh',
      hasBackdrop: true,
      disableClose: true,
    });
  }

  public onDelete(item: Organization): void {
    this.dialogFactory.confirmation({
      message: '¿Está seguro que desea eliminar este Organización?',
      callback:() => {
        this.store.dispatch(actions.removeOrganizations({ payload: item, id: item.id}));
        this.loadData();
      }
    });

  }

  public onSeeDetails(item: Organization): void {
    console.log('details:', item)
    this.store.pipe(select(x => x.certifications.certifications)).subscribe(res => {
      console.log('into promise')
      const certifications:CertificationModel[] = res.filter(x => x.organizationId == item.id);
  
      this.dialog.open(DetailsComponent, {
        data: {
          item: item,
          certifications: certifications
        },
        width: '70vw',
        height: '90vh',
        hasBackdrop: true
      });
    });

  }

  public onExport(fileType: FileType): void {
    const fileName: string = `organizations-export-${Date.now()}`;
    this.exportService.saveToFile(fileType, this.selectedData.selected, fileName);
  }

}