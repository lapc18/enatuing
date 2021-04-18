import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IColumn } from '../../models/enat.models';

@Component({
  selector: 'common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss']
})
export class CommonTableComponent implements OnInit {
 
  @Input() dataSource: any[] = [];
  @Input() columns: IColumn[] = [];
  @Input() isLoading: boolean = false;

  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onDetails: EventEmitter<any> = new EventEmitter();
  @Output() onEdit: EventEmitter<any> = new EventEmitter();

  public displayedColumns: string[];

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(c => c.name);
    this.displayedColumns.push('actions');
  }

  public delete(event: any): void {
    this.onDelete.emit(event);
  }

  public details(event: any): void {
    this.onDetails.emit(event);
  }

  public edit(event: any): void {
    this.onEdit.emit(event);
  }

}
