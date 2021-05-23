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
    //temp use:
    let payload: Normative[] = [];
    for(let i: number = 0; i < 100; i++){
      payload.push({
          id: i,
          publishedAt: `${2000 + i}`,
          description: `this is a description random for: ${i}`,
          color: '#646464',
          status: 'Activa'
      });
    }
    this.store.dispatch(actions.loadNormativesSuccess({ payload: payload }));
    this.store.dispatch(actions.onSuccess());
  }

  public onCreate(): void {
    this.dialog.open(null, {
      data: { isCreating: true },
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
        organization: item
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
      }
    });

  }

  public onSeeDetails(item: any): void {
    this.dialog.open(DynamicNormativeDetailComponent, {
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