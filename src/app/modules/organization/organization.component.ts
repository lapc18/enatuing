import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Organization } from 'src/app/core/domain/organizations/organizations.models';
import { DialogFactory } from 'src/app/core/factory/dialogs/dialog.factory';
import { CommonAbstractGrid } from 'src/app/core/models/common-grid.abstract';
import { columnSettings, FileType } from 'src/app/core/models/enat.models';
import { ExportService } from 'src/app/core/services/export.service';
import * as actions from 'src/app/core/stores/organizations/organizations.actions';
import { OrganizationState } from 'src/app/core/stores/organizations/organizations.reducers';
import { DynamicOrganizationDetailComponent } from './dynamic-organization-detail/dynamic-organization-detail.component';

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
    private store: Store<{ organization: OrganizationState }>,
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

  public onSeeDetails(item: any): void {
    this.dialog.open(DynamicOrganizationDetailComponent, {
      data: {
        isEditing: false,
        organization: item
      },
      minWidth: '50%',
      minHeight: '60vh',
      hasBackdrop: true
    });
  }

  public onExport(fileType: FileType): void {
    const fileName: string = `organizations-export-${Date.now()}`;
    this.exportService.saveToFile(fileType, this.selectedData.selected, fileName);
  }

}