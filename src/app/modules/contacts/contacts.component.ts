import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { CommonAbstractGrid } from 'src/app/core/models/common-grid.abstract';
import { columnSettings } from 'src/app/core/models/enat.models';
import { ContactState } from 'src/app/core/stores/contacts/contacts.reducers';
import { DynamicDetailContactComponent } from './dynamic-detail-contact/dynamic-detail-contact.component';
import { ExportService } from 'src/app/core/services/export.service';
import * as actions from '../../core/stores/contacts/contacts.actions';
import { Contact } from 'src/app/core/domain/contacts/contacts.models';
import { DialogFactory } from 'src/app/core/factory/dialogs/dialog.factory';
import { FileType } from 'src/app/core/models/enat.models';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent extends CommonAbstractGrid<Contact> implements OnInit {

  constructor(
    private dialog: MatDialog,
    private store: Store<{contact: ContactState}>,
    public dialogFactory: DialogFactory,
    public exportService: ExportService
  ) {
    super(columnSettings.contacts);
    this.data$ = this.store.pipe(select(state => state.contact.contacts));
    this.isLoading$ = this.store.pipe(select(state => state.contact.isLoading));
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this.store.dispatch(actions.loadContacts());
    this.isLoading$.subscribe(res => this.isLoading = res);
    this.data$.subscribe((res: Contact[]) => this.data = res);
    //temp use:
    let payload: any[] = [];
    for(let i: number = 0; i < 100; i++){
      payload.push({
          id: i,
          name: 'Luis Pimentel Colon',
          position: 'Gerente de sistemas: ' + i,
          email: 'luis.pimentel@optic.gob.do',
          telephoneNumber: (8099081200+i).toString(),
          ext: '1234',
          phoneNumber: (8099081200+i).toString(),
      });
    }
    this.store.dispatch(actions.loadContactsSuccess({ payload: payload }));
    this.store.dispatch(actions.onSuccess());
  }
  public onCreate(): void {
    this.dialog.open(DynamicDetailContactComponent, {
      data: { isCreating: true },
      width: '50%',
      hasBackdrop: true,
      disableClose: true,
    });
  }

  public onEdit(item: Contact): void {
    this.dialog.open(DynamicDetailContactComponent, {
      data: {
        isEditing: true,
        contact: item
      },
      width: '50%',
      hasBackdrop: true,
      disableClose: true,
    });
  }

  public onDelete(item: Contact): void {
    this.dialogFactory.confirmation({
      message: '¿Está seguro que desea eliminar este contacto?',
      callback:() => {
        this.store.dispatch(actions.removeContacts({ payload: item, id: item.id}));
        this.store.dispatch(actions.onSuccess());
      }
    });

  }

  public onSeeDetails(item: Contact): void {
    this.dialog.open(DynamicDetailContactComponent, {
      data: {
        isEditing: false,
        contact: item
      },
      width: '50%',
      hasBackdrop: true
    });
  }

  public onExport(fileType: FileType): void {
    const fileName: string = `some-name-here-${Date.now()}`;
    this.exportService.saveToFile(fileType, this.data, fileName);
  }

}
