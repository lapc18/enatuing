import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
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
export class OrganizationComponent extends CommonAbstractGrid<Organization> implements OnInit {

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

  public loadData(): void {
    this.store.dispatch(actions.loadOrganizations());
    this.isLoading$.subscribe(res => this.isLoading = res);
    this.data$.subscribe((res: Organization[]) => this.data = res);
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
        organization: item
      },
      minWidth: '50%',
      minHeight: '60vh',
      hasBackdrop: true,
      disableClose: true,
    });
  }

  public onDelete(item: Organization): void {
    this.dialogFactory.confirmation({
      message: '¿Está seguro que desea eliminar este Organizationo?',
      callback:() => {
        this.store.dispatch(actions.removeOrganizations({ payload: item, id: item.id}));
        this.store.dispatch(actions.onSuccess());
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
    const fileName: string = `some-name-here-${Date.now()}`;
    this.exportService.saveToFile(fileType, this.data, fileName);
  }

}