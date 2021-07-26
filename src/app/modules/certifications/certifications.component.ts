import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { columnSettings, FileType } from 'src/app/core/models/enat.models';
import { CommonAbstractGrid } from 'src/app/core/models/common-grid.abstract';
import * as actions from 'src/app/core/stores/certifications/certifications.actions'
import { DialogFactory } from 'src/app/core/factory/dialogs/dialog.factory';
import { select, Store } from '@ngrx/store';
import { ExportService } from 'src/app/core/services/export.service';
import { Certification } from 'src/app/core/domain/certifications/certifications.models';
import { Certificationstate } from 'src/app/core/stores/certifications/certifications.reducers';
import { DynamicCertificationsDetailComponent } from './dynamic-certifications-detail/dynamic-certifications-detail.component';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss']
})
export class CertificationsComponent extends CommonAbstractGrid<Certification> implements OnInit {

  constructor(
    private dialog: MatDialog,
    private store: Store<{certifications: Certificationstate}>,
    public dialogFactory: DialogFactory,
    public exportService: ExportService
  ) {
    super(columnSettings.certifications);
    this.data$ = this.store.pipe(select(state => state.certifications.certifications));
    this.isLoading$ = this.store.pipe(select(state => state.certifications.isLoading));
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this.store.dispatch(actions.loadCertifications());
    this.isLoading$.subscribe(res => this.isLoading = res);
    this.data$.subscribe((res: Certification[]) => this.data = res);
  }

  public onCreate(): void {
    this.dialog.open(DynamicCertificationsDetailComponent, {
      data: { isCreating: true },
      minWidth: '50%',
      minHeight: '60vh',
      hasBackdrop: true,
      disableClose: true,
    });
  }

  public onEdit(item: Certification): void {
    this.dialog.open(DynamicCertificationsDetailComponent, {
      data: {
        isEditing: true,
        certification: item
      },
      minWidth: '50%',
      minHeight: '60vh',
      hasBackdrop: true,
      disableClose: true,
    });
  }

  public onDelete(item: Certification): void {
    this.dialogFactory.confirmation({
      message: '¿Está seguro que desea eliminar este Certificacion?',
      callback:() => {
        this.store.dispatch(actions.removeCertifications({ payload: item, id: item.id}));
        this.store.dispatch(actions.onSuccess());
      }
    });

  }

  public onSeeDetails(item: Certification): void {
    this.dialog.open(DynamicCertificationsDetailComponent, {
      data: {
        isEditing: false,
        certification: item
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