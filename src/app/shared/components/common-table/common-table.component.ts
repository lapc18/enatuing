import { MatTableDataSource } from '@angular/material/table';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { IColumn } from '../../../core/models/enat.models';

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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public paginatedDataSource: MatTableDataSource<any[]>;
  public displayedColumns: string[];

  constructor() { }

  ngOnInit(): void {
    this.paginatedDataSource = new MatTableDataSource<any[]>(this.dataSource);
    this.displayedColumns = this.columns.map(c => c.name);
    this.displayedColumns.push('actions');
  }

  ngAfterViewInit(): void {
    this.paginatedDataSource.paginator = this.paginator;
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
