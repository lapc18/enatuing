import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommonAbstractGrid } from 'src/app/shared/models/common-grid.abstract';
import { columnSettings } from 'src/app/core/models/enat.models';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent extends CommonAbstractGrid implements OnInit {


  public isLoading$: Observable<boolean>;

  constructor(
    private dialog: MatDialog
  ) { 
    super(columnSettings.contacts);
  }

  ngOnInit(): void {
  }


  public loadData(): void {

  }
  public onCreate(): void {

  }
  public onEdit(item: any): void {

  }
  public onDelete(item: any): void {

  }
  public onSeeDetails(item: any): void {

  }

}
