import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { columnSettings } from 'src/app/core/models/enat.models';
import { CommonAbstractGrid } from 'src/app/core/models/common-grid.abstract';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss']
})
export class CertificationsComponent extends CommonAbstractGrid implements OnInit {


  public isLoading$: Observable<boolean>;

  constructor(
    private dialog: MatDialog
  ) { 
    super(columnSettings.certifications);
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