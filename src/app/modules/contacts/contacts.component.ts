import { Component, OnInit } from '@angular/core';
import { CommonAbstractGrid } from 'src/app/shared/models/common-grid.abstract';
import { columnSettings } from 'src/app/shared/models/enat.models';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent extends CommonAbstractGrid implements OnInit {

  constructor() { 
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
