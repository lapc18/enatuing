import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Normative } from 'src/app/core/domain/normatives/normatives.models';
import { DialogFactory } from 'src/app/core/factory/dialogs/dialog.factory';
import { CommonAbstractGrid } from 'src/app/core/models/common-grid.abstract';
import { columnSettings, FileType } from 'src/app/core/models/enat.models';
import { ExportService } from 'src/app/core/services/export.service';
import * as actions from 'src/app/core/stores/normatives/normatives.actions';
import { NormativesState } from 'src/app/core/stores/normatives/normatives.reducers';
import { DynamicNormativeDetailComponent } from './dynamic-normative-detail/dynamic-normative-detail.component';

@Component({
  selector: 'app-normatives',
  templateUrl: './normatives.component.html',
  styleUrls: ['./normatives.component.scss']
})
export class NormativesComponent extends CommonAbstractGrid<Normative> implements OnInit {

  public allowedRoles: { create?: string[], edit?: string[], remove?: string[] } = {
		create: ['admin', 'manager'],
		edit: ['admin', 'manager'],
		remove: ['admin', 'manager'],
	};

  constructor(
    private dialog: MatDialog,
    private store: Store<{ normatives: NormativesState }>,
    public dialogFactory: DialogFactory,
    public exportService: ExportService
  ) {
    super(columnSettings.normatives);
    this.data$ = this.store.pipe(select(state => state.normatives.normatives));
    this.isLoading$ = this.store.pipe(select(state => state.normatives.isLoading));
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this.store.dispatch(actions.loadNormatives());
    this.isLoading$.subscribe(res => this.isLoading = res);
    this.data$.subscribe((res: Normative[]) => this.data = res);
  }

  public onCreate(): void {
    this.dialog.open(DynamicNormativeDetailComponent, {
      data: { 
        isCreating: true, 
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

  public onEdit(item: Normative): void {
    this.dialog.open(DynamicNormativeDetailComponent, {
      data: {
        isEditing: true,
        normative: item,
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

  public onDelete(item: Normative): void {
    this.dialogFactory.confirmation({
      message: '¿Está seguro que desea eliminar esta Normativa?',
      callback:() => {
        this.store.dispatch(actions.removeNormatives({ payload: item, id: item.id}));
        this.store.dispatch(actions.onSuccess());
        this.loadData();
      }
    });

  }

  public onSeeDetails(item: any): void {
    this.dialog.open(DynamicNormativeDetailComponent, {
      data: {
        isEditing: false,
        normative: item
      },
      minWidth: '50%',
      minHeight: '60vh',
      hasBackdrop: true
    });
  }

  public onExport(fileType: FileType): void {
    const fileName: string = `nortics-export-${Date.now()}`;
    this.exportService.saveToFile(fileType, this.data, fileName);
  }

}