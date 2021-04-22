import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommonAbstractGrid } from 'src/app/core/models/common-grid.abstract';
import { columnSettings } from 'src/app/core/models/enat.models';
import { DynamicDetailContactComponent } from './dynamic-detail-contact/dynamic-detail-contact.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent extends CommonAbstractGrid implements OnInit {

  public isLoading$: Observable<boolean>;

  constructor(
    private dialog: MatDialog,
    
  ) { 
    super(columnSettings.contacts);
  }

  ngOnInit(): void {
    this.loadData();
  }


  public loadData(): void {
    this.data = [{
      name: 'Jacuno',
      position: 'Any'
    }];

  }
  public onCreate(): void {
    this.dialog.open(DynamicDetailContactComponent, {
      data: { isCreating: true },
      width: '50%',
      hasBackdrop: true,
      disableClose: true,
    });
  }
  public onEdit(item: any): void {
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
  public onDelete(item: any): void {

  }
  
  public onSeeDetails(item: any): void {
    this.dialog.open(DynamicDetailContactComponent, {
      data: {
        isEditing: false,
        contact: item
      },
      width: '50%',
      hasBackdrop: true
    });
  }

}
